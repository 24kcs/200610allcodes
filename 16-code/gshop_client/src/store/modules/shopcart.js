// 购物车相关的模块
// 引入api接口函数
import { reqAddToCart, reqDeleteCartItem, reqShopCartList, reqCheckCartItem } from '@/api'
export default {
  state: {
    shopList: [] // 购物车中的商品信息数据数组
  },
  mutations: {
    // 直接修改shopList数据
    RECEIVE_SHOP_LIST (state, shopList) {
      state.shopList = shopList
    }
  },
  actions: {
    // 添加购物车操作
    async addToCart1 ({ commit }, { skuId, skuNum, callback }) {
      const result = await reqAddToCart(skuId, skuNum)
      if (result.code === 200) {
        // 如果成功,回调函数中传入的是一个空字符串
        callback('')
      } else {
        // 如果失败,回调函数中传入的是一个非空字符串
        callback(result.message || '添加失败')
      }
    },
    // 通过this.$store.dispatch('addToCart2') 有会返回值, 就是当前的这个action的返回值
    async addToCart2 ({ commit }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum)
      return result.code === 200 ? '' : result.message || '添加失败'
    },
    async addToCart3 ({ commit,dispatch }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum)
      if(result.code===200){
        // 成功了
        dispatch('getShopList')
      }else{
        // 失败了
        alert(result.message)
      }
    },
    // 获取购物车中的商品信息数据
    async getShopList ({ commit }) {
      // 调用api接口,发送异步请求
      const result = await reqShopCartList()
      if (result.code === 200) {
        // 更新数据
        commit('RECEIVE_SHOP_LIST', result.data)
      }
    },
    // 根据skuId删除购物车中的某个购物项
    async deleteCartItem1 ({ commit }, skuId) {
      // 调用api接口函数
      const result = await reqDeleteCartItem(skuId)
      return result.code === 200 ? '' : result.message || '删除失败'
    },
    // 根据skuId删除购物车中的某个购物项
    async deleteCartItem2 ({ commit }, skuId) {
      // 调用api接口函数
      const result = await reqDeleteCartItem(skuId)
      if (result.code !== 200) {
        // 扔出一个异常---失败的promise
        throw new Error(result.message || '失败了')
        // 可以的,因为真的是失败的promise
        // return Promise.reject(new Error(result.message||'失败了'))
        // 不是失败的promise
        // return new Error(result.message||'失败了')
      }
    },
    // 切换购物项选中状态的
    async checkCartItem1 ({ commit }, { skuId, isChecked }) {
      const result = await reqCheckCartItem(skuId, isChecked)
      // 失败的问题
      if (result.code !== 200) {
        // 扔出错误
        throw new Error(result.message || '切换勾选状态失败')
      }
    }
  },
  getters: {
    // 总数量
    totalCount (state) {
      // 调用reduce来进行计算
      return state.shopList.reduce((pre, item) => {
        return item.isChecked === 1 ? pre + item.skuNum : pre
        // if(item.isChecked===1){
        //   return pre+item.skuNum
        // }else{
        //   return pre
        // }
      }, 0)
    },
    // 总价格
    totalPrice (state) {
      return state.shopList.reduce((pre, item) => {
        return item.isChecked === 1 ? pre + item.skuNum * item.skuPrice : pre
      }, 0)
    },
    // 是否全都选中
    isCheckAll (state) {
      // 数组中要有数据,并且每个数据都是选中的,才有意义
      return state.shopList.length > 0 && state.shopList.every(item => item.isChecked === 1)
    },
    // 获取所有选中的购物项
    selectedCartItems (state) {
      return state.shopList.filter(item => item.isChecked === 1)
      // return state.shopList.reduce((pre,item)=>{
      //   // 判断是否被选中
      //   if(item.isChecked===1){
      //     pre.push(item)
      //   }
      //   return pre
      // },[])
    }
  }
}


// function f1(obj1,num){
//   console.log(obj1)
// }
// f1(10)