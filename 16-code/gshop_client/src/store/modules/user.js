import { reqLogin,reqRegister,reqLogout } from '@/api'
// 用户模块
// 引入产生uuid的模块
import { getUUID } from '@/utils/storageUtils'
export default {
  state: {
    userInfo: {}, // 用户信息对象
    // 用户的临时id凭证
    userTempId: getUUID()
  },
  mutations: {
    // 直接更新用户信息数据---登录成功
    RECEIVE_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    },
    // 清空用户信息数据----退出
    RESET_USER_INFO (state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录
    async login({commit},{mobile, password}){
      // 调用api接口函数
      const result = await reqLogin(mobile, password)
      // 登录是否成功
      if(result.code===200){
        // 获取返回来的用户信息
        const userInfo = result.data
        // 坑
        // 提交mutation
        commit('RECEIVE_USER_INFO',userInfo)
      }else{
        throw new Error('登录失败了')
      }
    },
    // 注册----userInfo是对象(手机号码,密码,图形验证码)
    async register({commit},userInfo){
      const result = await reqRegister(userInfo)
      // 是否失败了
      if(result.code!==200){
        throw new Error('注册失败了')
      }
    },
    // 退出
    async logout({commit}){
      const result = await reqLogout()
      // 退出成功了,清空用户信息
      if(result.code===200){
        // 清空用户信息
        // 坑
        // 提交mutation
        commit('RESET_USER_INFO')

      }else{
        throw new Error('退出失败了')
      }
      // 退出失败了,提示信息

    }

  },
  getters: {}
}