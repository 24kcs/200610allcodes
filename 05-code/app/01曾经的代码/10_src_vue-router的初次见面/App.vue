<template>
  <div>
    <h2>App父级组件内容</h2>
    <!--路由链接,说白了,a标签-->
    <router-link to="/home">Home啊</router-link>
    <!--路由视图-->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style scoped>
</style>