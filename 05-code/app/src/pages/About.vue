<template>
  <div>
    <h2>About</h2>
    <input type="text" v-model="msg" />
  </div>
</template>
<script>
export default {
  name:'About',
  props:['msg']
}
</script>
<style scoped>
</style>