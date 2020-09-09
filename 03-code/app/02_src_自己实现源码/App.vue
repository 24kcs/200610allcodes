<template>
  <div>
    <h2>这是App父级组件</h2>
    今天真开心
    <!--如果组件中间还需要包裹其他的内容,那么就写成对的,如果没有其他内容,只写一个,但是要有结束标识-->
    <!--组件在使用的时候,组件名字是大写的,当成标签书写的时候,可以小写,但是不建议这么做,原因:组件的名字有可能会和标签名字重复-->
    <!--组件当成标签使用,可以换一个叫法:组件标签-->
    <Hello/>
  </div>
</template>
<script>
// 引入要使用的子级组件
import Hello from './components/Hello'
export default {
  name: 'App',
  // 注册组件
  components:{
    Hello
  }
}
</script>
<style >
div{
  color:green;
}
</style>
