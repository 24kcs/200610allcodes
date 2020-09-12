// 引入每个要注册路由的组件
// 引入About组件
import About from '../pages/About.vue'
// 引入Home组件
import Home from '../pages/Home.vue'
// 引入News组件
import News from '../pages/News.vue'
// 引入Message组件
import Message from '../pages/Message.vue'
// 引入MessageDetail组件
import MessageDetail from '../pages/MessageDetail.vue'
export default [
  // 注册路由对象
  {
    path:'/about',
    component:About
  },
  {
    path:'/home',
    component:Home,
    children:[
      {
        path:'/home/news',
        component:News
      },
      {
        path:'/home/message',
        component:Message,
        children:[
          {
            // 是路由的params方式传参
            path:'/home/message/detail/:id', // 用来做路由跳转的时候需要传递的参数的占位
            component:MessageDetail
          }
        ]
      }
    ]
  },
  // 设置路由的重定向操作
  {
    path:'/', // 设置根路径  localhost:8080/
    redirect:'/about' // 重定向
  }
]