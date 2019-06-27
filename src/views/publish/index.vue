<template>
  <el-card class="publish-card">
    <div slot="header"
         class="header-card">
      <span>发布文章</span>
      <div>
        <el-button type="success"
                   @click="handlePublish"
                   :disabled="editLoading"
                   :loading="publishloading">发布</el-button>
        <el-button :disabled="editLoading"
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
        this.submitEdit()
      } else {
        this.submitadd()
      }
    },
    submitEdit (draft) {
      this.$http({
        method: 'PUT',
        url: '/articles',
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
        this.publishloading = false
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '更改失败',
          type: 'warning'
        })
        this.publishloading = false
      })
    },
    submitadd (draft) {
      this.$http({
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
        this.publishloading = false
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '发布失败',
          type: 'warning'
        })
        this.publishloading = false
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
