<template>
  <div>
    <h1>EventTest组件</h1>
    <!--原生事件和自定义事件-->
    <!--标签中的原生事件,是系统自带的-->
    <!-- <button @click="showMsg1">原生事件测试</button> -->
    <!--标签中的自定义事件,自己定义的,但是事件是不可能分发的,废了,不能使用-->
    <!-- <button @xxx="showMsg1">自定义事件测试</button> -->
    <hr />
    <!--组件中使用自定义事件,没有使用.native进行修饰的事件,此时如果要分发事件,需要手动的分发-->
    <!-- <Event1 @click="showMsg2" /> -->
    <!--组件中使用了原生事件,可以自动的分发事件对应的回调函数-->
    <!-- <Event1 @click.native="showMsg3" /> -->
   
    <hr />
    <!--手动的分发组件上的自定义事件-->
    <!-- <Event2 @click="showMsg3" /> -->
    <!--手动的分发组件上的自定义事件-->
    <!-- <Event2 @xxx="showMsg4" /> -->

    <!--手动的分发组件上的自定义事件,同时可以传递参数-->
    <!-- <Event2 @xxx="showMsg5" /> -->

    <!--自定义的事件即使使用了.native进行了修饰,也不是原生事件-->
    <!-- <Event1 @xxx.native="showMsg2" /> -->
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
    showMsg4() {
      alert('Event2的自定义事件xxx触发了')
    },
    showMsg5(obj) {
      alert(obj.name+','+obj.age)
      alert('Event2的自定义事件xxx触发了')
    },
    zhenxiang() {
      alert('好帅哦')
    },
  },
}
</script>
