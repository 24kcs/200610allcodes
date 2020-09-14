<template>
  <div>
    <h2>次数:{{$store.state.count}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
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
  methods: {
    increment() {
      // 直接找mutation的方式
      this.$store.commit('INCREMENT')
    },
    decrement() {
      this.$store.commit('DECREMENT')
    },
    incrementOrOdd() {
      // 找action
      this.$store.dispatch('incrementOrOdd')
    },
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    },
  },
}
</script>
<style scoped>
</style>