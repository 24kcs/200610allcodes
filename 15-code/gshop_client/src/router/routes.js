// 引入Home组件
// 路径过于恶心,
import Home from '@/pages/Home'
// 引入Search组件
import Search from '@/pages/Search'
// 引入Login组件
import Login from '@/pages/Login'
// 引入Register组件
import Register from '@/pages/Register'
// 引入Detail组件
import Detail from '@/pages/Detail'
// 引入AddCartSuccess组件
import AddCartSuccess from '@/pages/AddCartSuccess'
// 引入购物车组件ShopCart
import ShopCart from '@/pages/ShopCart'
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
    path: '/search/:keyword?', // ? 表示参数可传可不传
    component: Search,
    name: 'search'
  },
  // 注册Login路由组件 
  {
    path: '/login',
    component: Login,
    // 用来存储所需的参数数据,随便的使用
    meta: {
      isHideFooter: true
    }
  },
  // 注册Register路由组件 
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true
    }
  },
  // 注册Detail路由组件---详情页---路由传参--params的方式
  {
    path: '/detail/:skuId',
    component: Detail,
    name: 'detail'
  },
  // 注册AddCartSuccess路由组件,query的方式传参
  {
    path:'/addcartsuccess',
    component:AddCartSuccess
  },
  // 注册购物车路由组件---ShopCart
  {
    path:'/shopcart',
    component:ShopCart
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]