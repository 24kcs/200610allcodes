<template>
  <a href="javascript:;" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props:['title'],
  mounted () {
    // console.log(this.$attrs)
    // console.log(this.$listeners)
  }
}



</script>

<style lang="less" scoped>
</style>
