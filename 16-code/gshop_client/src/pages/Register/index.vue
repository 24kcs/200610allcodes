<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>
      注册新用户
      <span class="go">
        我有账号，去
        <!-- <a href="login.html" target="_blank">登陆</a> -->
        <router-link to="/login">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <!--vee-validate插件,先安装,需要进行配置,在表单中,需要使用:v-validate="'required'",还需要配置表桥的name属性,验证的时候,提示信息是在span标签中进行使用的,span标签中的,span中的表单的提示信息中需要name属性中的内容,至此,表单验证的插件才可以有效果-->
      <input
        type="text"
        placeholder="请输入你的手机号"
        v-model="mobile"
        v-validate="'required|phone'"
        name="mobile"
      />
      <span style="color: red">{{ errors.first('mobile') }}</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input
        type="text"
        placeholder="请输入验证码"
        v-model="code"
        v-validate="'required|code1'"
        name="code"
      />
      <img
        ref="code"
        src="/api/user/passport/code"
        alt="code"
        @click="updateCode"
      />
      <span style="color: red">{{ errors.first('code') }}</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input
        type="text"
        placeholder="请输入你的登录密码"
        v-model="password"
        v-validate="'required'"
        name="password"
      />
      <span style="color: red">{{ errors.first('password') }}</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input
        type="text"
        placeholder="请输入确认密码"
        v-model="password2"
        v-validate="'required'"
        name="password2"
      />
      <span style="color: red">{{ errors.first('password2') }}</span>
    </div>
    <div class="controls">
      <input name="m1" type="checkbox" v-model="isAgree" />
      <span>同意协议并注册《尚品汇用户协议》</span>
    </div>
    <div class="btn">
      <a href="javascript:" @click="register">完成注册</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      mobile: '18101085879', // 收集手机号码的
      password: '111111', // 收集密码
      password2: '111111', // 收集确认密码
      code: '', // 收集图形验证码
      isAgree: true, // 控制是否同意的
    }
  },
  methods: {
    // 更新图形验证码
    updateCode() {
      // 将来有一天地址相同,无法更换图片的效果,此时可以使用时间戳的方式进行设置
      // this.$refs.code.src = '/api/user/passport/code?time=' + Date.now()
    },
    // 点击事件的回调函数,实现注册功能
    async register() {
      // 获取所有需要验证的数据
      const { mobile, password, password2, code, isAgree } = this
      // 进行验证
      if (!isAgree) {
        alert('请勾选是否同意协议')
        return
      }
      // 判断密码是否一致
      if (password !== password2) {
        alert('密码不一致')
        return
      }
      // 表单的验证---坑

      try {
        // 实现注册
        await this.$store.dispatch('register', { mobile, password, code })
        console.log('注册成功')
      } catch (error) {
        alert('错误信息是:' + error.message)
      }
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;
  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;
    span {
      font-size: 14px;
      float: right;
      a {
        color: #e1251b;
      }
    }
  }
  div:nth-of-type(1) {
    margin-top: 40px;
  }
  .content {
    // text-align: center;
    padding-left: 390px;
    margin-bottom: 18px;
    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }
    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }
    img {
      vertical-align: sub;
    }
  }
  .controls {
    text-align: center;
    input {
      vertical-align: middle;
    }
  }
  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;
    a {
      text-decoration: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>