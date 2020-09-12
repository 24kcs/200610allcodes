<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.13="add" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  // props: {
  //   addTodo: {
  //     type: Function, // 类型
  //     required: true, // 必须的
  //   },
  // },
  data() {
    return {
      title: '', // 用来获取或者设置文本框中输入的数据
    }
  },
  methods: {
    add() {
      // 获取文本框的数据
      const title = this.title.trim()
      // 判断是否存在
      if (title) {
        // 定义对象
        const todo = {
          id:Date.now(),
          title,
          isCompleted:false
        }
        // 添加数据
        // this.addTodo(todo)

        // $emit()用来分发事件的
        // 参数1:事件类型(事件名字)
        // 参数2:事件的回调函数所需的参数
        this.$emit('addTodo',todo)
        // 清空文本框
        this.title = ''
      }
    },
  },
}
</script>
<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>