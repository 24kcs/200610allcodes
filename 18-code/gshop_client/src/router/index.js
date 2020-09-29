// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 引入store
import store from '@/store'
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
const router = new VueRouter({
  mode: 'history', // 地址栏中不带#
  routes,
  // 解决路由跳转到滚动的位置
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局前置路由守卫
// router.beforeEach((to, from, next) => {
//   // to---->目标路由对象---route,(path---路径)
//   // from---离开前的路由对象---route,(path---路径)
//   // next---->函数,不传参数--->放行,传了地址,就去地址
//   // next('/login')

//   // 访问的地址不是登录界面,强制让其跳转到登录界面
//   // if(to.path!=='/login'){
//   //   next('/login')
//   // }else{
//   //   next()
//   // }
// })

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 1. 只有在登录的情况下才能访问/trade,/pay,/center 这些路由
  // 获取目标路由信息对象中的访问地址
  const targetPath = to.path
  // 准备一个需要检测路由的地址的数组
  const checkPath =['/trade','/pay','/center',]
  // 判断目标路由地址在检测的路由地址的数组中是否存在
  // if(checkPath.indexOf(targetPath)!==-1){
  if(checkPath.find(path=>targetPath.indexOf(path)!==-1)){
    // 判断是否已经登录(依据:是否有token)
    if(store.state.user.userInfo.name){
      // 放行
      next()
    }else{
      // 7. 如果我访问的是/center,但是没有登录,先跳转到登录界面,登录成功后自动的进入到/center中
      // 跳转到登录界面
      next('/login?redirect='+targetPath)
    }

  }else{
    // 不存在,则正常的放行
    next()
  }


})
// 向外暴露出去一个路由器对象
export default router



/*

需求:
1. 只有在登录的情况下才能访问/trade,/pay----/paysuccess,/center-----/center/myorder----/cener/groupbuy 这些路由
2. 只有在没有登录的情况下才能进入到登录界面(如果已经登录了,就进入到首页)
3. 只有skuId和skuNum和skuInfo数据都存在情况下才可以进入到/addsuccess界面
4. 只有从/shopcart 才能进入到/trade
5. 只有从/trade 才能进入到/pay
6. 只有从/pay 才能进入到/paysuccess
7. 如果我访问的是/center,但是没有登录,先跳转到登录界面,登录成功后自动的进入到/center中
8. 如果退出,则直接进入到首页

以上需求之前学过的技术,实现起来比较麻烦,所以,使用路由守卫实现

路由:一种映射关系,地址和组件之间的关系,一旦地址和某个普通的组件通过注册的方式有了关系后,该组件也叫路由组件,
每个组件的实例对象中都会有两个对象: $router,$route
$router:路由器对象,可以实现编程式路由的跳转(js代码实现跳转)
$route:路由信息对象---路由对象(可以获取路由跳转的时候传递的参数数据,params/query/meta),props
守卫:通过监视路由,做出一些操作
路由守卫(导航守卫):监视路由,然后做出一些操作

导航守卫:
1. 全局导航守卫:在实例化路由器对象的时候进行设置
  全局前置导航守卫:beforeEach-------------------------重点
  全局解析导航守卫:beforeResolve
  全局后置导航守卫:afterEach
2. 路由独享守卫:在注册路由组件对象中进行设置
  beforeEnter------------------------------重点
3. 组件内的守卫:在组件对象中进行设置
  beforeRouteEnter------------------------重点
  beforeRouteUpdate (2.2 新增)
  beforeRouteLeave






*/