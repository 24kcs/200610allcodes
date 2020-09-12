// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'

// 设置浏览器控制台提示信息是否显示
Vue.config.productionTip = false
/* eslint-disabled no-new */
new Vue({
  // 数据初始化之前的生命周期回调
  beforeCreate () {
    // 定义事件总线对象
    Vue.prototype.$bus = this
  },
  el: '#app',
  components: { App },
  template: '<App/>'
})