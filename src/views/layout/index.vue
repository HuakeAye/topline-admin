<template>
  <el-container>
    <el-aside width="200px">
      <AppAside />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <router-view />
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './conponents/AppAside'
import AppHeader from './conponents/AppHeader'
export default {
  // name: 'Applayout',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: rgb(255, 153, 255);
}
.el-header {
  background-color: #fff;
}
.el-main {
  background-color: aquamarine;
}
</style>
