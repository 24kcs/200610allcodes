<template>
  <div>
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="gaveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
// 引入混入(混合)
import {cpMixin} from './mixins'
export default {
  name: 'Daughter',
   mixins: [cpMixin],
  data() {
    return {
      money: 20000,
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
