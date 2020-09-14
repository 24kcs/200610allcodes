<template>
  <li
    @mouseenter="mouseHandle(true)"
    @mouseleave="mouseHandle(false)"
    :style="{color:myColor,backgroundColor:bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isChecked" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>
<script>
// 引入消息订阅对象
import PubSub from 'pubsub-js'
export default {
  name: 'Item',
  props: {
    todo: Object, // 传递过来的todo的数据的类型必须是对象
    index:Number
  },
  data() {
    return {
      myColor: 'black', // 前景色
      bgColor: 'white', // 背景色
      isShow:false // 控制按钮的显示或者隐藏
    }
  },
  computed: {
    isChecked:{
      get(){
        return this.todo.isCompleted
      },
      set(){
        // this.toggleTodo(this.todo)
        PubSub.publish('toggleTodo', this.todo);
      }
    }
  },
  methods: {
    // 鼠标进入和离开事件的回调函数
    mouseHandle(flag) {
      // 判断是鼠标进入还是离开
      if (flag) {
        // 进入
        this.myColor = 'green'
        this.bgColor = 'pink'
        this.isShow = true
      } else {
        // 离开
         this.myColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    // 删除当前这一条数据
    del(){
      // 友好的提示
      if(window.confirm('确定要删除吗?')){
        // this.deleteTodo(this.index)
        // 参数1:事件名字(事件类型)
        // 参数2:事件对应的回调函数内部需要的参数
        this.$bus.$emit('deleteTodo',this.index)
      }
    }
  },
}
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>