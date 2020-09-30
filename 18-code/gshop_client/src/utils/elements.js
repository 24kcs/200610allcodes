// 引入Vue
import Vue from 'vue'
// 引入element-ui中的部分组件
import {  MessageBox, Message } from 'element-ui'
// 把相关的组件绑定到Vue的原想上, 组件的实例对象可以直接使用
Vue.prototype.$msgbox = MessageBox // 弹框
Vue.prototype.$alert = MessageBox.alert // 弹框
Vue.prototype.$message = Message // 提示消息

// 1 . 安装element-ui---->弹框及有提示信息
// 2 . qrcode ---->产生二维码