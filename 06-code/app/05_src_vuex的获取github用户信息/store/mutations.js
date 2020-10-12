// 包含了多个直接修改状态数据的方法的对象
// 引入mutation的type
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-type'
export default {
  // 请求的时候改变状态
  [REQUEST] (state) {
    state.firstView = false
    state.loading = true
  },
  // 请求成功的时候改变状态
  [REQ_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },
  // 请求失败的时候改变状态
  [REQ_ERROR] (state, error) {
    state.loading = false
    state.errorMsg = error.message
  },
}