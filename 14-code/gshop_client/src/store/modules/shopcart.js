// 购物车相关的模块
// 引入api接口函数
import { reqAddToCart } from '@/api'
export default {
  state: {
    shopList: [] // 购物车中的商品信息数据数组
  },
  mutations: {},
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
      const result = await reqAddToCart(skuId,skuNum)
      return result.code === 200 ? '' : result.message || '添加失败'
    }
  },
  getters: {}
}