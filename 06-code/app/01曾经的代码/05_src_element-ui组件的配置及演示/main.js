// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
// 设置浏览器控制台提示信息是否显示

import { Button } from 'element-ui';
// 注册为全局的公共组件
Vue.component(Button.name, Button);
Vue.config.productionTip = false
/* eslint-disabled no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})