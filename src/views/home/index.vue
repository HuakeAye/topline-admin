<template>
  <div>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data () {
    return {
      message: 'hello home'
    }
  }
}
</script>

<style lang="less" scoped>
div {
  background-color: #eee;
  height: 100%;
}
</style>
