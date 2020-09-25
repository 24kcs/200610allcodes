// 用户模块
// 引入产生uuid的模块
import {getUUID} from '@/utils/storageUtils'
export default {
  state: {
    userInfo:{}, // 用户信息对象
    // 用户的临时id凭证
    userTempId:getUUID()
  },
  mutations: {
    
  },
  actions: {
   
  },
  getters: {}
}