<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 分发action
    this.$store.dispatch('getBaseCategoryList')
  },
}

// function Person(){}
// Person.prototype.eat=function(){
//   console.log('真好吃')
// }

// Person.prototype.eat=function(){
//   console.log('不好吃')
// }
// var per = new Person();
// per.eat()
</script>
<style scoped>
</style>