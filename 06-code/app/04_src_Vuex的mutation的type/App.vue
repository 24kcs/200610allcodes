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
// 引入Vuex的辅助函数
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import {INCREMENT,DECREMENT} from './vuex/mutation-type'
export default {
  name: 'App',
  // 数据对象,用来管理数据的
  // 数据的状态是可以修改的
  // 状态数据
  computed: {
    // count(){
    //   return this.$store.state.count
    // },
    // evenOrOdd(){
    //   return this.$store.getters.evenOrOdd
    // }
    // mapState和mapGetters一般都是在计算属性中使用的
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])

  },
  methods: {
    // 无论是mapMutations还是mapActions中的参数可以是对象也可以是数组
    // 如果方法名和内部调用的mutation的名字不一样,则用对象,如果一样则用数组
    ...mapMutations({increment:INCREMENT,decrement:DECREMENT}),
    ...mapActions(['incrementOrOdd','incrementAsync'])
  },
}
</script>
<style scoped>
</style>
