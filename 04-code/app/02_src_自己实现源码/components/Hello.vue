<template>
  <div>
    <h2>我是Hello子级组件</h2>
    今天真高兴
  </div>
</template>
<script>
// 向外暴露当前组件对象
export default {
  // 设置当前组件的名字
  name:'Hello'
}
</script>
<style>
div{
  color:red;
}
</style>