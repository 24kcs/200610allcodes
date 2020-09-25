// 引入api接口函数
import { reqDetailInfo } from '@/api'
export default {
  state: {
    // 商品的详情信息对象
    detailInfo: {}
  },
  mutations: {
    // 直接修改商品详情信息对象数据
    RECEIVE_DETAIL_INFO (state, detailInfo) {
      state.detailInfo = detailInfo
    }
  },
  actions: {
    // 异步请求的方式来获取商品详情信息数据
    async getDetailInfo ({ commit }, skuId) {
      const result = await reqDetailInfo(skuId)
      if (result.code === 200) {
        commit('RECEIVE_DETAIL_INFO', result.data)
      }
    }
  },
  getters: {
    // 分类信息对象
    categoryView (state) {
      return state.detailInfo.categoryView || {}
    },
    // 销售属性数组
    spuSaleAttrList (state) {
      return state.detailInfo.spuSaleAttrList || []
    },
    // 单个产品的信息对象
    skuInfo (state) {
      return state.detailInfo.skuInfo || {}
    },
    // 图片轮播图数组
    skuImageList (state) {
      const skuInfo = state.detailInfo.skuInfo
      return skuInfo ? skuInfo.skuImageList : []
    },
  }
}