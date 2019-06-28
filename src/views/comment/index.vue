<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span>评论管理</span>
    </div>
    <el-table :data="articles">
      <el-table-column prop="title"
                       label="标题">
      </el-table-column>
      <el-table-column prop="total_comment_count"
                       label="总评论数">
      </el-table-column>
      <el-table-column prop="fans_comment_count"
                       label="粉丝评论数">
      </el-table-column>
      <el-table-column label="粉丝评论数">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.comment_status"
                     :disabled="scope.row.changeloading"
                     active-color="#13ce66"
                     @change="switchChange(scope.row)"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleComment',
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadConment()
  },
  methods: {
    loadConment () {
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(data => {
        data.results.forEach(item => {
          item.changeloading = false
        })
        console.log(data)
        this.articles = data.results
      })
    },
    switchChange (item) {
      console.log(item)
      item.changeloading = true
      this.$http({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: item.id + ''
        },
        data: {
          allow_comment: item.comment_status
        }
      }).then(data => {
        this.$message({
          message: `${item.comment_status ? '启用' : '禁止'}评论成功`,
          type: 'success'
        })
        item.changeloading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('错了哦，这是一条错误消息')
        item.comment_status = !item.comment_status
        item.changeloading = false
      })
    }
  }
}
</script>

<style>
</style>
