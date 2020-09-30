<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <!--使用List这个组件,可以帮助我们遍历数据,-->

    <List :todos="todos" >
      <!--scope是一个对象,包含了row和$index-->
     <template slot-scope="scope">
       <span v-if="scope.row.isComplete" style="color:green">{{scope.row.text}}</span>
       <span v-else>{{scope.row.text}}</span>
     </template>
    </List>
    <hr />


     <List :todos="todos" >
      <!--scope是一个对象,包含了row和$index-->
     <template v-slot:default="scope">
       <span>序号:{{scope.$index+1}}</span>
       <span :style="{color:scope.$index%2===0?'green':'blue'}">{{scope.row.text}}</span>
     </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
import List from './List'
export default {
  data() {
    return {
      todos: [
        { id: 1, text: 'AAA', isComplete: false },
        { id: 2, text: 'BBB', isComplete: true },
        { id: 3, text: 'CCC', isComplete: false },
        { id: 4, text: 'DDD', isComplete: false },
      ],
    }
  },

  components: {
    List,
  },
}
</script>
