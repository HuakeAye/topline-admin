<template>
  <el-select :value="value"
             @change="loadchannel"
             clearable>
    <el-option v-for="item in channel"
               :key="item.id"
               :label="item.name"
               :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  data () {
    return {
      channel: []
    }
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.gainchannel()
  },
  methods: {
    gainchannel () {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        // console.log(data)
        this.channel = data.channels
      })
    },
    loadchannel (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style>
</style>
