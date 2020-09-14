<template>
  <h2 v-if="firstView">请输入搜索关键字...</h2>
  <h2 v-else-if="loading">正在发送请求中...</h2>
  <h2 v-else-if="errorMsg">错误信息:{{errorMsg}}</h2>
  <div class="row" v-else>
    <div class="card" v-for="(user,index) in users" :key="index">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
  </div>
</template>
<script>
// 引入axios对象
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      firstView: true, // 默认显示提示的信息
      loading: false, // 是否开始发送请求
      errorMsg: '', // 存储的是错误信息
      users: [], // 用来存储所有的用户对象信息的数组
    }
  },
  // 组件界面加载完毕后的生命周期回调
  mounted() {
    // 通过事件总线,绑定一个发送请求的事件
    this.$bus.$on('search', async (searchName) => {
      // 调用地址发送请求
      const url = `https://api.github.com/search/users`
      // 第一次更新状态数据
      this.firstView = false
      this.loading = true
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
        this.loading = false
        this.users = users
      } catch (error) {
        // 第三次更新状态数据
        this.loading = false
        this.errorMsg = error.message
      }
    })
  },
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>