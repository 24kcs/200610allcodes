import Vue from 'vue'
import App from './App.vue'
// 引入路由器的对象
import router from './router'
// 引入store
import store from './store'
// 引入TypeNav组件
import TypeNav from '@/components/TypeNav'
// 引入mock
import './mock'
Vue.config.productionTip = false

// 设置为全局的公共组件
Vue.component('TypeNav',TypeNav)
new Vue({
  // 渲染App组件
  render: h => h(App),
  router, // 注册路由器
  store // 注册vuex仓库
}).$mount('#app')





// 脚手架4中的代码
// new Vue({
//   render: h => h(App),
// }).$mount('#app')  相当于el:'#app'

// 脚手架2的项目中的代码
// new Vue({
//   el:'#app',
//   components:{App},
//   template:'<App/>'
// })


// render: h => h(App),

// 渲染App组件
// render:function(createElement){
//   return createElement(App)
// }


// render:function(h){
//   return h(App)
// }

// render(h){
//   return h(App)
// }

// render:h=>h(App)

