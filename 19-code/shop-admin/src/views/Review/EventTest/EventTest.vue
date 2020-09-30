<template>
  <div>
    <h1>EventTest组件</h1>
    <!--原生事件和自定义事件-->
    <!--HTML标签中的事件是属于原生事件,自定义事件不是针对HTML标签,是针对组件而言的,而且HTML标签上使用了自定义的事件是无效的-->
    <button @click="showMsg1">按钮测试</button>
    <!--HTML中是无法使用自定义事件的-->
    <button @gaga="showMsg1">测试按钮2</button>
    <hr />
    <!--组件中使用了系统自带的事件,但是没有使用.native修饰,所以,是个自定义事件-->
    <!--组件中绑定的事件,最终给组件内部的最外面的父级元素标签-->
    <Event1 @click.native="showMsg1" />
    <!-- <Event1 @click="showMsg2" /> -->
    <!--无用-->
    <!-- <Event1 @xxx.native="showMsg2" /> -->
    <hr />
    <Event2 @click="showMsg4" @xxx="showMsg5" />

    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
// 引入两个子级组件
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  // 注册组件
  components: {
    Event1,
    Event2,
  },

  methods: {
    // 按钮的原生点击事件对应的回调函数
    showMsg1(event) {
      alert('触发了:' + event.target.innerHTML)
    },
    // 组件Event1的点击事件对应的回调函数
    showMsg2() {
      alert('Event1的点击事件')
    },
    // 组件Event1的点击事件加了.native 对应的回调函数
    showMsg3(event) {
      alert(event.target.innerHTML)
    },
    // 第二个组件的自定义事件监听回调
    showMsg4(text) {
      alert(text)
      alert('Event2的自定义事件click触发了')
    },
    showMsg5(obj) {
      alert(obj.age)
      alert('Event2的自定义事件xxx触发了,')
    },
    zhenxiang() {
      alert('好帅哦')
    },
  },
}
</script>
