// 管理首页中所有的数据
// 引入api接口函数
import { reqBaseCategoryList } from '@/api'
export default {
  state: {
    // 三级分类信息数据数组
    baseCategoryList: []
  },
  mutations: {
    // 直接修改三级分类信息数据数组
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    }
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
    }
  },
  getters: {}
}