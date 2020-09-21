// 管理首页中所有的数据
// 引入api接口函数
import { reqProductList } from '@/api'
export default {
  state: {
    // 商品信息数据对象
    productList: {}
  },
  mutations: {
    // 直接更新商品信息数据对象
    RECEIVE_PRODUCT_LIST (state, productList) {
      state.productList = productList
    }
  },
  actions: {
    // 获取商品信息数据对象
    async getProductList ({ commit }, searchParams) {
      const result = await reqProductList(searchParams)
      if (result.code === 200) {
        commit('RECEIVE_PRODUCT_LIST', result.data)
      }
    }

  },
  getters: {
    // 品牌信息数据
    trademarkList (state) {
      return state.productList.trademarkList || []
    },
    // 平台属性信息数据
    attrsList (state) {
      return state.productList.attrsList || []
    },
    // 产品信息数据
    goodsList (state) {
      return state.productList.goodsList || []
    },
  }
}