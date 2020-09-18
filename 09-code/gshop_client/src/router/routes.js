// 引入Home组件
// 路径过于恶心,
import Home from '@/pages/Home'
// 引入Search组件
import Search from '@/pages/Search'
// 引入Login组件
import Login from '@/pages/Login'
// 引入Register组件
import Register from '@/pages/Register'
// 向外暴露所有组件对象的数组
export default [
  // 注册Home路由组件
  {
    path: '/',
    component: Home
  },
  // 注册Search路由组件
  {
    // path: '/search/:keyword', // 占位的方式,用来实现params的方式传参
    path:'/search/:keyword?', // ? 表示参数可传可不传
    component: Search,
    name:'search'
  },
  // 注册Login路由组件 
  {
    path: '/login',
    component: Login,
    // 用来存储所需的参数数据,随便的使用
    meta:{
      isHideFooter:true
    }
  },
  // 注册Register路由组件 
  {
    path: '/register',
    component: Register,
    meta:{
      isHideFooter:true
    }
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]