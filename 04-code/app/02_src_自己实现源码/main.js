// 引入Vue
import Vue from 'vue'
// 引入App组件(.vue/.js都可以省略不写)
import App from './App.vue'
// 设置浏览器的控制台中是否显示提示信息
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app', // 获取id为app的html容器
  components: { App }, // 注册组件
  template: '<App/>' // 使用App组件模版
})
