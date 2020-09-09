// 该文件必须存在
// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App'
// 设置浏览器的控制台中是否显示那个提示信息
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app', // 根据选择器进行html容器的获取,最终会把组件中所有的内容放在index.html的id为div中
  // 注册组件
  components: { App },
  // 使用App组件的模版
  template: '<App/>'
})
