<template>
  <div>
    <h2>BABA有存款: {{ money }}</h2>
    <button @click="borrowMoney1">找儿子小明借100元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney2">找女儿小红借200元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney3">找所有孩子借500元钱</button>
    <br />
    <hr />
    <Son ref="son" />
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data() {
    return {
      money: 1000,
    }
  },
  components: {
    Son,
    Daughter,
  },
  methods: {
    // 向儿子借钱
    borrowMoney1() {
      // 不太合适,直接操作组件中的数据
      // this.$refs.son.money-=100
      this.$refs.son.borrowMoney(100)
      this.money += 100
    },
    // 向女儿借钱
    borrowMoney2() {
      // 不太合适,直接操作组件中的数据
      // this.$refs.son.money-=100
      this.$refs.dau.borrowMoney(200)
      this.money += 200
    },
    // 向所有的孩子借钱
     borrowMoney3() {
      // 不太合适,直接操作组件中的数据
      // this.$refs.son.money-=100
      // this.$refs.dau.borrowMoney(200)
      // this.$refs.son.borrowMoney(100)
      this.$children.forEach(child=>{
        child.borrowMoney(500)
        this.money+=500
      })
     
    },
  },
}
</script>

<style>
</style>
