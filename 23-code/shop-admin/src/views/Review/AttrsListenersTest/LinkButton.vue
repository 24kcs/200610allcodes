<template>
  <a href="javascript:;" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props:{
    title:String
  },
  mounted () {
    // console.log(this.$attrs)
    // console.log(this.$listeners)
  }
}


var obj ={
  age:19
}
var key ='age'
console.log(obj[key])
</script>

<style lang="less" scoped>
</style>
