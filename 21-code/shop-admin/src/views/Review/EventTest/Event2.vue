<template>
  <div>
    <h2>Event2组件</h2>
    <!-- <button @click="$emit('click',$event)">组件2中的第一个按钮</button> -->
    <!--手动分发父级组件的自定义事件,同时传递一个字符串数据-->
    <!-- <button @click="$emit('xxx','真开心')">组件2中的第二个按钮</button> -->
    <!--手动分发父级组件的自定义事件,同时传递一个对象数据-->
     <button @click="$emit('xxx',{name:'小明',age:18})">组件2中的第二个按钮</button>
  </div>
</template>
