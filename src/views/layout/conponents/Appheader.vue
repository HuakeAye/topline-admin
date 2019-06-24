<template>
  <el-row class="app-header">
    <el-col :span="14">
      北京传智播客有限公司
    </el-col>
    <el-col :span="6"
            :offset="4">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img width="30"
               :src="userinfo.photo"
               alt="">
          {{userinfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item>账户信息</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    this.userinfo = JSON.parse(window.localStorage.getItem('user_info'))
  }
}
</script>

<style lang="less" scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #409eff;
  img {
    border-radius: 50%;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
