// 引入api接口函数
import { reqTradeInfo, reqPayInfo } from '@/api'
export default {
  state: {
    tradeInfo: {}, // 订单信息的数据对象----/trade组件中使用
    payInfo: {} // 支付信息的数据对象------/pay组件中使用
  },
  mutations: {
    // 直接更新订单数据
    RECEIVE_TRADE_INFO (state, { tradeInfo }) {
      state.tradeInfo = tradeInfo
    },
    // 直接更新支付数
    RECEIVE_PAY_INFO (state, { payInfo }) {
      state.payInfo = payInfo
    },
  },
  actions: {
    // 获取订单的信息数据
    async getTradeInfo ({ commit }) {
      // 调用获取订单信息的api接口函数
      const result = await reqTradeInfo()
      // 判断成功或者失败
      if (result.code === 200) {
        // 获取响应回来的信息数据
        const tradeInfo = result.data
        // 提交mutation----->更新数据
        commit('RECEIVE_TRADE_INFO', { tradeInfo })
      }else{
        throw new Error(result.message||'获取订单失败了')
      }
    },
    // 获取支付数据
    async getPayInfo ({ commit }, orderId) {
      const result = await reqPayInfo(orderId)
      if (result.code === 200) {
        const payInfo = result.data
        commit('RECEIVE_PAY_INFO', { payInfo })
      }else{
        throw new Error(result.message||'获取支付信息失败')
      }
    }
  },
  getters: {}
}