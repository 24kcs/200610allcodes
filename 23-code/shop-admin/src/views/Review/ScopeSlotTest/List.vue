<template>
  <ul>
    <!--颜色的显示操作由父级组件来完成-->
    <!-- <li v-for="(item,index) in todos" :key="item.id"> -->
      <!--子级组件这边需要把每个数据传递给父级组件,但是最终父级组件处理后的数据需要在子级组件中进行展示-->
      <!--占位,使用插槽-->
      <!-- <slot :row="item" :$index="index"></slot>
    </li> -->

    <li v-for="(todo,index) in todos" :key="todo.id">
      <!--显示什么内容,完全取决于父级组件向这里传递什么内容-->
      <!--slot是插槽,如果没有name属性,此时是普通插槽-->
      <slot :row="todo" :$index="index"></slot>
    </li>
 
  </ul>
</template>

<script>
export default {
  name: 'List',
  props:{
    todos:Array
  }
}
</script>
