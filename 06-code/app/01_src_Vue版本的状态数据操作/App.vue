<template>
  <div>
    <h2>次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementOrOdd">incrementOrOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  // 数据对象,用来管理数据的
  // 数据的状态是可以修改的
  // 状态数据
  data() {
    return {
      count: 1,
    }
  },
  computed: {
    evenOrOdd() {
      return this.count % 2 === 0 ? '偶数' : '奇数'
    },
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    incrementOrOdd(){
      if(this.count%2!==0){
        this.count++
      }
    },
    incrementAsync(){
      setTimeout(() => {
        this.count++
      }, 1000);
    }
  },
}
</script>
<style scoped>
</style>