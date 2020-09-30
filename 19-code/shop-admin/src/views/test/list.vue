<template>
  <div>
    <button v-if="$hasBP('test.add')">添加</button>
    <button v-if="$hasBP('test.update')">更新</button>
  </div>
</template>

<script>
export default {
  name: 'TestList',
}
</script>

<style lang="less" scoped>

</style>
