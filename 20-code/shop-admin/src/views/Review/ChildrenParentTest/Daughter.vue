<template>
  <div>
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="gaveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>

export default {
  name: 'Daughter',
  data() {
    return {
      money: 20000,
    }
  },
  methods: {
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
