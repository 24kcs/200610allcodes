<template>
  <div class="container">
    <!--搜索框-->
    <Search/>
    <!--展示用户信息的界面-->
    <Main/>
  </div>
</template>
<script>
// 引入Search组件
import Search from './components/Search'
// 引入Main组件
import Main from './components/Main'
export default {
  name:'App',
  components: {
    Search,
    Main
  }
}
</script>
<style scoped>
</style>