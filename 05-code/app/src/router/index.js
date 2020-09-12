// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入路由对象数组
import routes from './routes'
// 声明使用VueRouter插件
Vue.use(VueRouter)
// 实例化路由器并暴露出去
export default new VueRouter({
  mode:'history',
  // 注册多个路由组件对象
  routes
})