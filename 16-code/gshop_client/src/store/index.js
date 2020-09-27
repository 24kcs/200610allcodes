// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
// 引入modules
import modules from './modules'
// 声明使用Vuex
Vue.use(Vuex)

// 实例化Vuex的对象并暴露出去
export default new Vuex.Store({
  state, // 总的state
  mutations, // 总的mutations
  actions, // 总的actions
  getters, // 总的getters
  // 包含了多个子模块的对象,每个模块中都有自己的state,mutations,actions,getters
  modules
})

// 曾经:组件中获取状态数据:
/*
this.$store.state.xxx
或者
...mapState(['xxx'])

现在:
state--->总的state
所有的子的state最终都会汇总到总的state中.
this.$store.state.home.xxx
或者
...mapState({
  xxx:state=>state.home.xxx
})

总的actions中有一个方法是xxx(){}方法,子的actions中也有一个方法是xxx(){},最终两个都会调用
注意:尽量不要让方法重名

只有state中的数据访问的写法略有不同,其他和之前一样

*/