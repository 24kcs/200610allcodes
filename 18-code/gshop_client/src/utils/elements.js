// 引入Vue
import Vue from 'vue'
// 引入element-ui中的部分组件
import {  MessageBox, Message } from 'element-ui'
// 把相关的组件绑定到Vue的原想上, 组件的实例对象可以直接使用
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message