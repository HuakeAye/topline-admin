<template>
  <div class="article">
    <!-- 筛选部分 -->
    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form ref="form"
               :model="form"
               label-width="80px">

        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="活动区域">
          <el-select v-model="form.region"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker v-model="value1"
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
        <span>共找到0条符合条件的内容</span>
      </div>
      <el-table :data="tableData"
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
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="success"
                     plain>修改</el-button>
          <el-button type="danger"
                     plain
                     @click="handleDelete(scope.row)">删除</el-button>
          <template slot-scope="">
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="1000"
                     @current-change="handlePageChange">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [],
      value1: ''
    }
  },
  created () {
    this.$http({
      method: 'GET',
      url: '/articles'
      // headers: { // 自定义发送请求头
      //   // Authorization: `Bearer ${userInfo.token}`
      // }
    }).then(res => {
      console.log(res.results)
      this.tableData = res.results
    })
  },
  methods: {
    onSubmit () { },
    handlePageChange (page) {
      console.log(page)
    }
  }
}
</script>

<style lang="less">
.filter-card {
  margin-bottom: 20px;
}
</style>
