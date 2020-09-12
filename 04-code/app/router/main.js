/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件: 指定组件标签名
    App,
  },
  template: '<App/>',
  router // 配置路由器
})
