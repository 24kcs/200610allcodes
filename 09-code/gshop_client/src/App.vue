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
// 引入api接口函数
import { reqGetBaseCategoryList } from '@/api'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    Footer,
  },
  async mounted() {
    const result = await reqGetBaseCategoryList()
    console.log(result)
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