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
// 引入Trade提交订单
import Trade from '@/pages/Trade'
// 引入支付组件Pay
import Pay from '@/pages/Pay'
// 引入支付成功的组件PaySuccess
import PaySuccess from '@/pages/PaySuccess'
// 引入订单组件Center
import Center from '@/pages/Center'
// 引入MyOrder组件
import MyOrder from '@/pages/Center/MyOrder'
// 引入GroupBuy组件
// import GroupBuy from '@/pages/Center/GroupBuy'
// 路由的懒加载
const GroupBuy=()=>import('@/pages/Center/GroupBuy')
// 引入store
import store from '@/store'
// 向外暴露所有组件对象的数组
export default [
  // Trade路由组件
  {
    path: '/trade',
    component: Trade,
    // 4. 只有从/shopcart 才能进入到/trade
    beforeEnter: (to, from, next) => {
      // 判断从哪里来的(从哪里离开的)
      if(from.path==='/shopcart'){
        next() // 放行
      }else{
        next('/shopcart')
      }
    }
  },
  // Pay路由组件
  {
    path: '/pay',
    component: Pay,
    // 通过props的方式来进行参数的传递,让组件和$route之间的关闭不那么的密切(解耦)
    props: (route) => ({ orderId: route.query.orderId }),
    // 5. 只有从/trade 才能进入到/pay
    beforeEnter: (to, from, next) => {
      // 判断从哪里来的(从哪里离开的)
      if(from.path==='/trade'){
        next() // 放行
      }else{
        next('/trade')
      }
    }
  },
  // PaySuccess路由组件
  {
    path: '/paysuccess',
    component: PaySuccess,
    // 6. 只有从/pay 才能进入到/paysuccess
    beforeEnter: (to, from, next) => {
      // 判断从哪里来的(从哪里离开的)
      if(from.path==='/pay'){
        next() // 放行
      }else{
        next('/pay')
      }
    }
  },
  // Center路由组件
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '/center/myorder',
        component: MyOrder
      },
      {
        path: '/center/groupbuy',
        component: GroupBuy
      },
      // 重定向
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
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
    },
    // 路由独享守卫:在注册路由的时候,内部使用守卫,针对当前的这个路由进行守卫操作
    // 2. 只有在没有登录的情况下才能进入到登录界面(如果已经登录了,就进入到首页)
    // beforeEnter: (to, from, next) => {
    //   // 判断有没有登录
    //   if (store.state.user.userInfo.name) {
    //     next('/')
    //   } else {
    //     next()
    //   }
    // }
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
    path: '/addcartsuccess',
    component: AddCartSuccess,
    // 3. 只有skuId和skuNum和skuInfo数据都存在情况下才可以进入到/addsuccess界面
    beforeEnter: (to, from, next) => {
      // 先获取参数数据
      const { skuId, skuNum } = to.query
      const skuInfo = localStorage.getItem('SKU_INFO')
      // 判断这三个数据是否都存在
      if (skuId && skuNum && skuInfo) {
        next()
      } else {
        // 从哪里来的回到哪里去
        next(from.path)
      }
    }
  },
  // 注册购物车路由组件---ShopCart
  {
    path: '/shopcart',
    component: ShopCart
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]