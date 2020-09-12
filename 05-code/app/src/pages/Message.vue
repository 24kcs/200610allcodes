<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="m.id">
        <router-link replace :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        ---
        <button @click="showPush(m.id)">push查看</button>
        ---
        <button @click="showReplace(m.id)">replace查看</button>
      </li>
    </ul>
    <hr>
    <button @click="$router.back()">返回</button>
    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'Message',
  data () {
    return {
      messages:[]
    }
  },
  // 组件界面渲染完毕后的生命周期回调函数
  mounted () {
    setTimeout(() => {
      this.messages=[
        {id:1,title:'message001'},
        {id:2,title:'message002'},
        {id:3,title:'message003'}
      ]
    }, 1000);
  },
  methods: {
    // 点击按钮,实现路由跳转及参数传递
    showPush(id){
      // 通过Js代码实现路由跳转:编程式路由跳转
      // console.log(this.$router)
      this.$router.push(`/home/message/detail/${id}`)
    },
    showReplace(id){
      this.$router.replace(`/home/message/detail/${id}`)
    }
  }
}


// router-link和push方法路由跳转几乎一样(声明式/编程式)
// replace可以理解为没有历史记录,直接返回到最初
</script>
<style scoped>
</style>