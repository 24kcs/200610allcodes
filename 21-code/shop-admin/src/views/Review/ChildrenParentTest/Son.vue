<template>
  <div>
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
// 引入混入(混合)

export default {
  name: 'Son',
  data() {
    return {
      money: 30000,
    }
  },
  methods: {
    // 借钱的方法
    borrowMoney(money){
      this.money-=money
    },
    // 给钱
    gaveMoney(money){
      // 获取父级组件
      this.$parent.money+=money
      this.money-=money
    }

  }
 
}
</script>
