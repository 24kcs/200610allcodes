<template>
  <div>
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
// 引入混入(混合)
import {cpMixin} from './mixins'
export default {
  name: 'Son',
  mixins: [cpMixin],
  data() {
    return {
      money: 30000,
    }
  },
  // methods: {
  //   // borrowMoney(money) {
  //   //   this.money -= money
  //   // },
  //   // gaveMoney(money) {
  //   //   this.$parent.money += money
  //   //   this.money -= money
  //   // },
  // },
}
</script>
