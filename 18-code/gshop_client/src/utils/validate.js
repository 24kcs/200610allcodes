// 引入Vue
import Vue from 'vue'
// 引入VeeValidate插件---表单验证的插件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 声明使用插件
Vue.use(VeeValidate)


VeeValidate.Validator.localize('zh_CN', {
  // 表单验证的提示的信息,可以设置为中文的提示信息
  messages: zh_CN.messages,
  // 每个属性翻译成中文的意思
  attributes: {
    mobile:'手机号码',
    code:'图形验证码',
    password:'密码',
    password2:'确认密码'
  }
})

// 为当前表单验证添加的扩展的验证方法
VeeValidate.Validator.extend('phone', {
  // 获取新的验证的规则的提示信息,
  // field---->mobile
  getMessage: field => `请输入正确的`+field,
  // 文本框中输入的内容
  validate: value =>{
      return /^[1]\d{10}$/.test(value) 
  }  
});

// 为当前表单验证添加的扩展的验证方法
VeeValidate.Validator.extend('code1', {
  // 获取新的验证的规则的提示信息,
  // field---->mobile
  getMessage: field => `请输入正确的`+field,
  // 文本框中输入的内容
  validate: value =>{
      return /^\d{4}$/.test(value) 
  }  
});
