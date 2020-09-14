// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 包含了多个状态数据的对象
const state = {
  count: 0
}
// 包含了多个直接修改状态数据的方法的对象
const mutations = {
  // 都是同步的代码,mutations对象中的每个方法都可以叫mutation
  // 加的状态改变
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据的方法的对象
const actions = {
  // 同步或者是异步的代码,actions对象中的每个方法都可以叫action
  // 加
  increment (context) {
    context.commit('INCREMENT')
  },
  // 减
  decrement ({ commit }) {
    commit('DECREMENT')
  },
  // 奇数加
  incrementOrOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit('INCREMENT')
    }
  },
  // 异步加
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000);
  }
}
// 包含了多个状态数据的计算属性的get方法的对象
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}
// 实例化Vuex的对象,并暴露出现
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})





