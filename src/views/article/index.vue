<template>
  <div class="article">
    <!-- 筛选部分 -->
    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form ref="form"
               :model="filterParams"
               label-width="80px">

        <el-form-item label="状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label="">全部</el-radio>
            <el-radio v-for="(item,index) in staTypes"
                      :key="item.label"
                      :label="index+''">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <articlechannel v-model="filterParams.channel_id"></articlechannel>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker v-model="value1"
                          value-format="yyyy-MM-dd"
                          @change="timescope"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查找</el-button>
        </el-form-item>

      </el-form>
    </el-card>
    <!-- 表格部分 -->
    <el-card class="list-card">
      <div slot="header"
           class="clearfix">
        <span>共找到<strong>{{totalCount}}</strong>条符合条件的内容</span>
      </div>
      <el-table :data="tableData"
                v-loading="articleLoading"
                style="width: 100%">
        <el-table-column prop="cover.images[0]"
                         label="封面"
                         width="60">
          <template slot-scope="scope">
            <img width="30"
                 :src="scope.row.cover.images[0]">
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题"
                         width="180">
        </el-table-column>
        <el-table-column prop="pubdate"
                         label="发布日期"
                         width="180">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态">
          <template slot-scope="scope">
            <el-tag :type="staTypes[scope.row.status].type">{{staTypes[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success"
                       plain
                       @click="$router.push(`/publish/${scope.row.id}`)">修改</el-button>
            <el-button type="danger"
                       plain
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="totalCount"
                     :current-page="page"
                     :disabled="articleLoading"
                     @current-change="handlePageChange">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import articlechannel from '@/components/article_channel'
export default {
  name: 'ArticleList',
  components: {
    articlechannel
  },
  data () {
    return {
      tableData: [],
      value1: '',
      totalCount: null,
      articleLoading: false, // 分页按钮是否禁用
      staTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      // 文章查询条件
      filterParams: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      // 获取频道数据
      channel: [],
      page: 1,
      filterData: {}
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    onSubmit () {
      for (var key in this.filterParams) {
        if (this.filterParams[key]) {
          this.filterData[key] = this.filterParams[key]
        }
      }
      this.page = 1
      this.loadArticles(this.page)
    },
    timescope (time) {
      console.log(time)
      this.filterParams.begin_pubdate = time[0]
      this.filterParams.end_pubdate = time[1]
    },
    handleDelete (article) {
      this.$confirm('确定删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'DELETE',
          url: `/articles/${article.id}`
        }).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handlePageChange (page) {
      this.page = page
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      const filterData = this.filterData
      this.articleLoading = true
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          per_page: 10,
          ...filterData
        }
      }).then(data => {
        this.tableData = data.results
        this.totalCount = data.total_count
        this.articleLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 20px;
}
</style>
