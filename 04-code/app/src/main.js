// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 设置浏览器控制台提示信息是否显示
Vue.config.productionTip = false
// 定义事件总线
Vue.prototype.$bus = new Vue()
/* eslint-disabled no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})