<!--这是模版标签,页面中是不会被渲染出来的-->
<template>
  <!--模版标签中必须有一对根标签,所有的html内容全都要在根标签中书写,这个根标签可以随意-->
  <div>
    <img src="./assets/logo.png">
    <!--使用-->
    <HelloWorld/>
  </div>
</template>

<script>
// 先引入
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  // 注册组件
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
