// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 重新修改路由器对象中的push方法和replace方法
const pushOrigin = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return pushOrigin.call(this, location, onComplete, onAbort)
}
const replaceOrigin = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return replaceOrigin.call(this, location, onComplete, onAbort)
}
// 声明使用路由器插件
Vue.use(VueRouter)
// 实例化路由器对象,并暴露出去
export default new VueRouter({
  mode: 'history', // 地址栏中不带#
  routes
}) 