<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>

    <!-- <a href="javascript:;" title="好帅哦">
      <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
    </a>
     <a href="javascript:;" title="真帅哦">
      <el-button type="info" icon="el-icon-edit" size="small"></el-button>
    </a>
     <a href="javascript:;" title="太帅了">
      <el-button type="danger" icon="el-icon-delete" size="medium"></el-button>
    </a>-->

    <!--
     封装一个高级的组件(目的,为了方便使用)
     v-bind指令----强制绑定属性,v-bind="{ id: someProp, 'other-attr': otherProp }"
     v-on指令----绑定事件监听,  v-on="{ mousedown: doThis, mouseup: doThat }"
     $attrs属性也是对象,该对象内部包含标签(组件)上传递的所有的属性(不包括prop,class,style)
     $listeners属性也是对象,该对象内部包含标签(组件)上传递的所有的自定义事件监听
    -->

    <!--封装的高级复用的组件,内部需要接收父级组件传递进来的所有的属性,但是具体有什么属性不能确定-->
    <LinkButton title="添加" type="primary" icon="el-icon-plus" @click="add" />
    <LinkButton title="修改" type="info" icon="el-icon-edit" @click="update" />
    <LinkButton title="删除" type="danger" icon="el-icon-delete" size="medium" @click="del" />
  </div>
</template>

<script type="text/ecmascript-6">
import LinkButton from './LinkButton'
export default {
  name: 'AttrsListenersTest',
  components: {
    LinkButton,
  },
  methods: {
    add() {
      alert('点击了添加按钮')
    },
    add2() {
      alert('双击了修改按钮')
    },
    update() {
      alert('点击了修改按钮')
    },
    del() {
      alert('点击了删除按钮')
    },
  },
}

// <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
// div标签中同时绑定了多个数据---写法过于麻烦
// <div :name="name1" :age="age1" :id="someProp" :other="otherProp"></div>
// 简单写法
// <div v-bind="{name:name1,age:age1,id:someProp,other:otherProp}"></div>

// <div v-bind="obj"></div>

// <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

// <button v-on="obj2" />

// var obj={
//   name:'小明'
// }
// console.log(obj.name)
// var key = 'name'
// console.log(obj['name'])

// console.log(obj[key])
// console.log(obj.key)

// v-bind:age="age1"
//  v-bind:['age']="value"
//  var key1='age'
//  v-bind[key1]="value"

// var obj={
//   name:'小明',
//   age:10
// }
// for(var key in obj){
//   console.log(obj[key])  // 行不行    行:1  不行:2
//   console.log(obj.key) // 行不行 行:1 不行:2
// }
</script>
