import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
new Vue({
  // 渲染App组件
  render: h => h(App),
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

