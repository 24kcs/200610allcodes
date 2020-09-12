<template>
  <ul>
    <li>ID:{{$route.params.id}}</li>
    <li>TITLE:{{detail.title}}</li>
    <li>CONTENT:{{detail.content}}</li>
  </ul>
</template>
<script>
export default {
  name: 'MessageDetail',
  data() {
    return {
      messageDetail: [
        { id: 1, title: 'message001', content: 'detail001' },
        { id: 2, title: 'message002', content: 'detail002' },
        { id: 3, title: 'message003', content: 'detail003' },
      ],
      detail: {}, // 用来存储找到的对象数据
    }
  },
  // 组件界面加载后的生命周期回调----只执行一次
  mounted() {
    // $route 是路由信息对象
    // 获取的是路由跳转的时候传递过来的参数数据
    // const id = this.$route.params.id * 1
    // this.detail = this.messageDetail.find((detail) => detail.id === id)
    this.showMsg(this.$route)
  },
  watch: {
    $route(val) {
      this.showMsg(val)
    },
  },
  methods: {
    showMsg(route) {
      const id = route.params.id * 1
      this.detail = this.messageDetail.find((detail) => detail.id === id)
    },
  },
}
</script>
<style scoped>
</style>