// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入Home普通组件
import Home from '../pages/Home.vue'
// 声明使用路由器插件
Vue.use(VueRouter)
// 实例化路由器并暴露出去
export default new VueRouter({
  mode: 'history', // 设置浏览器的地址栏中是否有 #
  routes: [
    // 注册路由(组件)
    {
      path: '/home', // 当前的路由地址(一般情况路由的地址和组件的名字几乎一样)
      component: Home // 路由组件
    }
  ]
})