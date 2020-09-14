<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo" />
      <List :todos="todos" />
      <!-- <Footer :todos="todos" :checkAllTodos="checkAllTodos" /> -->
      <Footer :todos="todos" :checkAllTodos="checkAllTodos">
        <label slot="left">
          <input type="checkbox" v-model="checkAll" />
        </label>

        <!-- <p slot="left">fasfasfds</p> -->

        <span slot="center">
          <span>已完成{{count}}</span>
          / 全部{{todos.length}}
        </span>

        <button class="btn btn-danger" slot="right">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>
<script>
// 引入Header
import Header from './components/Header'
// 引入List
import List from './components/List'
// 引入Footer
import Footer from './components/Footer'
// 引入消息订阅对象
import PubSub from 'pubsub-js'
// 引入storage
import storage from './utils/storage'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer,
  },
  data() {
    return {
      // todos: [
      //   { id: 1, title: '中岛美雪', isCompleted: false },
      //   { id: 2, title: '滨崎步', isCompleted: true },
      //   { id: 3, title: '花泽香菜', isCompleted: false },
      // ],
      // todos:JSON.parse(window.localStorage.getItem('todos_key')||'[]')
      todos: storage.get(),
    }
  },
  // 界面渲染完毕之后的生命周期回调
  mounted() {
    // 绑定删除数据的事件
    // 参数1:事件名字(事件类型)
    // 参数2:回调函数
    this.$bus.$on('deleteTodo', (index) => {
      this.deleteTodo(index)
    })
    // 消息订阅
    // 参数1:消息名字
    // 参数2:回调函数,msg---消息名字,data---->该消息发布的时候传入的参数
    // 返回值是该消息的标识
    this.token = PubSub.subscribe('toggleTodo', (msg, data) => {
      // 切换选中
      this.toggleTodo(data)
    })
  },
  // 组件销毁之前的生命周期回调
  beforeDestroy() {
    // 全都销毁
    this.$bus.$off()
    // 取消订阅
    PubSub.unsubscribe(this.token)
  },
  methods: {
    // 添加数据的方法
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 根据索引来删除数据
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 设置当前的数据是否被选中
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 设置全选或者全不选
    checkAllTodos(isChecked) {
      this.todos.forEach((todo) => {
        todo.isCompleted = isChecked
      })
    },
  },
  computed: {
    count() {
      return this.todos.reduce(
        (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
        0
      )
    },
    // 全选全不选操作
    checkAll: {
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAllTodos(val)
      },
    },
  },
  watch: {
    todos: {
      deep: true, // 深度监视
      // handler:function(val){
      //   // 缓存到浏览器中
      //   // window.localStorage.setItem('todos_key',JSON.stringify(val))
      // }
      handler: storage.set,
    },
  },
}

// function f1(){

// }

// const s1 = Symbol.for('宁宁姐');
// const s2 = Symbol.for('宁宁姐');
// console.log(s1===s2)

// 事件:就是一件事,需要有触发的条件,事件源,事件类型,回调函数
// click,mouseenter,mouseleave,keyup.....系统的事件
// 事件触发了,也可以叫事件分发了
// 可以自己定义事件,但是,需要手动分发

// function Person(){}
// Person.prototype.sayHi=function(){
//   console.log('他竟然不爱我,否则怎么可能不记得原型呢')
// }
// function Student(){}
// Student.prototype=new Person()
// var stu = new Student()
// stu.sayHi()

// function f1(){
//   console.log('f1函数')
// }
// var obj ={
//   sayHi:f1
// }
// console.log(f1)
// (function(){})
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

