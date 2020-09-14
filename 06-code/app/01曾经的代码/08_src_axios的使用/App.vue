<template>
  <div>
    <h2 v-if="!repUrl">正在加载中....</h2>
    <h2 v-else>
      Most Star is
      <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      repUrl: '', // 存储的是动态的访问地址
      repName: '', // 存储的是文字内容
    }
  },
  async mounted() {
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`
    const response =await axios.get(url)
    const result = response.data.items[0]
    // 更新表达式的数据
    this.repUrl = result.html_url
    this.repName = result.name
   
  },
  //
}
</script>
<style scoped>
</style>