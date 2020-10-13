<template>
  <div>
    <h2>深入v-model</h2>
    <!--
      v-model指令的本质:value属性配合input事件
    -->
    <!--直接使用v-model指令实现双向数据绑定的效果-->
    <input type="text" v-model="msg" />
    <p>{{ msg }}</p>
    <hr />
    <input type="text" :value="msg2" @input="msg2 = $event.target.value" />
    <p>{{ msg2 }}</p>

    <hr />
    <!--v-model指令可以在表单标签中使用,那么是否可以在组件中使用-->
    <!--v-model指令的本质是value属性和input事件,组件中使用v-model指令,也就意味着向组件中传递了value属性和input事件-->
    <CustomInput v-model="msg3" />
    <p>{{msg3}}</p>

    <hr />
    <CustomInput :value="msg4" @input="msg4=$event" />
    <p>{{ msg4 }}</p>
  </div>
</template>



<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  data() {
    return {
      msg: 'abcdef',
      msg2: '12345',
      msg3: 'hello',
      msg4: 'world',
    }
  },
  components: {
    CustomInput,
  },
  methods: {},
}
</script>
