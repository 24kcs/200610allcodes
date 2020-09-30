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
// 引入swiper的样式(原因:ListContainer组件和Floor组件中都有轮播图效果,其他的组件中也有该效果,此时,优化代码,直接在main.js中引入一次)
import 'swiper/css/swiper.css'
// 引入Carousel组件---轮播图组件(ListContainer和Floor组件中使用)
import Carousel from '@/components/Carousel'
// 引入Pagination组件
import Pagination from '@/components/Pagination'
// 引入validate.js文件
import './utils/validate'
// 引入api接口
import * as API from '@/api'
// 引入elements文件,可以让当前的项目使用element-ui组件库
import './utils/elements'
// 引入懒加载的插件---图片的懒加载
import VueLazyload from 'vue-lazyload'
// https://www.cnblogs.com/rachelch/p/9802227.html
// 引入动态加载的图片
import loading from './assets/loading.gif'
Vue.use(VueLazyload, {
  loading
})



// 把API绑定到Vue的原型对象上即可
Vue.prototype.$API= API
Vue.config.productionTip = false

// 设置为全局的公共组件
Vue.component('TypeNav',TypeNav)
// 参数1:组件的名字,参数2:组件对象
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

// Vue.prototype.$bus = new Vue()
new Vue({
  // 数据初始化之前
  beforeCreate () {
    // 事件总线的方式
    Vue.prototype.$bus = new Vue()
  },
  // 渲染App组件
  render: h => h(App),
  router, // 注册路由器
  store // 注册vuex仓库
}).$mount('#app')

// 布尔类型 和  数字  字符串  基本包装类型
// var str='哈哈'
// str.age=20
// console.log(str.age)





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

