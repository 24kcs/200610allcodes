// 包含了多个间接修改状态数据的方法的对象
// 引入mutation的type
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-type'
// 引入axios
import axios from 'axios'
export default {
  async search ({ commit }, searchName) {
    // 调用地址发送请求
    const url = `https://api.github.com/search/users`
    // 第一次更新状态数据
    commit(REQUEST)
    try {
      // ?q= params的参数设置
      const response = await axios.get(url, {
        params: {
          q: searchName,
        },
      })
      const users = response.data.items.map((item) => ({
        login: item.login,
        html_url: item.html_url,
        avatar_url: item.avatar_url,
      }))
      // 第二次更新状态数据
      commit(REQ_SUCCESS, users)
    } catch (error) {
      // 第三次更新状态数据
      commit(REQ_ERROR, error)
    }
  }
}