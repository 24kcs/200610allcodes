<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <Footer :todos="todos" :checkAllTodos="checkAllTodos" />
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
      todos: [
        { id: 1, title: '中岛美雪', isCompleted: false },
        { id: 2, title: '滨崎步', isCompleted: true },
        { id: 3, title: '花泽香菜', isCompleted: false },
      ],
    }
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
}

// const s1 = Symbol.for('宁宁姐');
// const s2 = Symbol.for('宁宁姐');
// console.log(s1===s2)
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

