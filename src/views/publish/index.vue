<template>
  <el-card class="publish-card">
    <div slot="header"
         class="header-card">
      <span>{{isEdit?'更新':'发布'}}文章</span>
      <div>
        <el-button type="success"
                   @click="handlePublish(false)"
                   :disabled="editLoading"
                   :loading="publishloading">{{isEdit?'更改':'发布'}}</el-button>
        <el-button :disabled="editLoading"
                   @click="handlePublish(true)"
                   type="primary">存入草稿</el-button>
      </div>
    </div>
    <el-form v-loading="editLoading">
      <el-form-item label="标题">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item>
        <quill-editor v-model="articleForm.content"
                      ref="myQuillEditor"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <!-- <el-input v-model="articleForm.title"></el-input> -->
      </el-form-item>
      <el-form-item label="频道">
        <articlechannel v-model="articleForm.channel_id"></articlechannel>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import articlechannel from '@/components/article_channel'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AppPublish',
  components: {
    articlechannel,
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    isEdit () {
      return this.$route.name === 'publish-Edit'
    }
  },
  data () {
    return {
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      editorOption: {},
      editLoading: false,
      publishloading: false
    }
  },
  created () {
    console.log(this.$route)
    this.isEdit && this.loadEdit()
  },
  methods: {
    loadEdit () {
      this.editLoading = true
      this.$http({
        method: 'GET',
        url: `/articles/${this.$route.params.id}`
      }).then(data => {
        this.articleForm = data
        this.editLoading = false
      })
    },
    handlePublish () {
      this.publishloading = true
      if (this.isEdit) {
        // 这里执行编辑操作
        this.submitEdit().then(() => {
          this.publishloading = false
        })
      } else {
        // 这里执行发布操作
        this.submitadd().then(() => {
          this.publishloading = false
        })
      }
    },
    submitEdit (draft) {
      return this.$http({
        method: 'PUT',
        url: `/articles/${this.$route.params.id}`,
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        console.log(data)
        this.$message({
          message: '更改成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err.response.status)
        this.$message({
          message: '更改失败',
          type: 'warning'
        })
      })
    },
    submitadd (draft) {
      return this.$http({
        method: 'POST',
        url: '/articles',
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '发布失败',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
