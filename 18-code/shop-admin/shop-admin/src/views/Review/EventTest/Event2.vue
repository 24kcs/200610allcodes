<template>
  <div>
    <h2>Event2组件</h2>
    <button @click="$emit('click','强哥什么样不记得了')">组件2中的按钮</button>
    <button @click="$emit('xxx',{age:18})">组件2中的第二个按钮</button>
  </div>
</template>
