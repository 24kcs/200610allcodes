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
  // 注册组件对象
  {
    path: '/',
    component: Home
  }, {
    path: '/search',
    component: Search
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]