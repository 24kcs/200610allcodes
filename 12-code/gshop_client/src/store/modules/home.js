// 管理首页中所有的数据
// 引入api接口函数
import { reqBaseCategoryList, reqBanners, reqFloors } from '@/api'
export default {
  state: {
    // 三级分类信息数据数组
    baseCategoryList: [],
    // 大轮播图数据
    banners: [],
    // 楼层数据
    floors: []
  },
  mutations: {
    // 直接修改三级分类信息数据数组
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      // 去掉最后面的两个数据
      state.baseCategoryList = baseCategoryList.splice(0,baseCategoryList.length-2)
    },
    // 直接修改大轮播图的数据
    RECEIVE_BANNERS (state, banners) {
      state.banners = banners
    },
    // 直接修改楼层的数据
    RECEIVE_FLOORS (state, floors) {
      state.floors = floors
    },
  },
  actions: {
    // 异步请求,获取三级分类信息数据
    async getBaseCategoryList ({ commit }) {
      // 调用接口发送异步请求
      const result = await reqBaseCategoryList()
      // 判断
      if (result.code === 200) {
        // 提交mutation
        commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
      }
    },
    // 异步获取大轮播图的数据
    async getBanners ({ commit }) {
      const result = await reqBanners()
      if (result.code === 200) {
        commit('RECEIVE_BANNERS', result.data)
      }
    },
    // 异步获取楼层的数据
    async getFloors ({ commit }) {
      const result = await reqFloors()
      if (result.code === 200) {
        commit('RECEIVE_FLOORS', result.data)
      }
    },
  },
  getters: {}
}