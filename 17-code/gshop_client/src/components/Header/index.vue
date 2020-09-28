<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>{{ userInfo.name }}</span
            >&nbsp;
            <a href="javascript:;" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <!-- <a href="###">登录</a>
            <a href="###" class="register">免费注册</a>-->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="javascript:;">我的订单</a> -->
          <router-link to="/center">我的订单</router-link>
          <!-- <a href="###">我的购物车</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/Logo.png" alt />
        </a>-->
        <router-link class="logo" title="尚品汇" to="/">
          <img src="./images/Logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Header',
  // 数据对象
  data() {
    return {
      keyword: '', // 用来收集文本框中输入的关键字数据
    }
  },
  // 计算属性
  computed: {
    // 获取用户信息
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    // 点击按钮跳转到Search界面
    toSearch() {
      // 每个两遍
      // 此时多次点击按钮,会直接报错,此错误是vue-router中的一个bug
      // this.$router.push('/search')
      // 传入一个成功回调
      // this.$router.push('/search', () => {})
      // 可以传入成功的回调和失败的回调
      // this.$router.push('/search', () => {},()=>{})
      // 只传入失败的回调
      // this.$router.push('/search',undefined,()=>{})
      // 使用then不行,用.then和.catch同时才可以
      // this.$router.push('/search').then(()=>{}).catch(()=>{})
      // 只使用catch也可以解决问题
      // this.$router.push('/search').catch(()=>{})

      // 路由跳转的时候需要传递参数
      // params的方式传参
      // this.$router.push(`/search/${this.keyword}`)
      // query的方式传参
      // this.$router.push(`/search?keyword=${this.keyword}`)

      // 可以使用对象的方式进行参数的传递,但是也分为params和query的方式
      // query的方式 以对象的形式来进行传参
      // this.$router.push({path:'/search',query:{keyword:this.keyword}})
      // this.$router.push({name:'search',query:{keyword:this.keyword}})
      // params的方式 以对象的形式来进行传参
      // this.$router.push({ name: 'search', params: { keyword: this.keyword } })

      // query和params以对象的形式做路由跳转并传参的时候,query的方式可以使用path或者name,但是params的方式不能用path,可以用name

      // 是否需要携带query的参数
      // 通过路由信息对象获取里面的query参数及path地址
      const { path, query } = this.$route
      // 判断文本框中是否输入内容
      if (this.keyword) {
        // 此时说明文本框中已经有了搜索的关键字
        if (path.indexOf('/search') === 0) {
          // 此时说明点击按钮的时候,文本框中有搜索关键字,而且也点击了分类的信息
          // 那么需要携带query参数和params参数
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword },
            query,
          })
        } else {
          // 此时说明文本框中有搜索关键字,但是没有在search界面中,所以,也不需要携带query参数
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword },
          })
        }
      } else {
        // 此时说明文本框中没有搜索关键字
        if (path.indexOf('/search') === 0) {
          // 但是确实是在/search中,所以,需要携带query参数
          this.$router.push({ name: 'search', query })
        } else {
          // 没有搜索关键字,也没有在/search中
          this.$router.push({ name: 'search' })
        }
      }
      // this.keyword=''
    },

    // 退出操作
    logout() {
      if (window.confirm('您确定要退出吗')) {
        this.$store.dispatch('logout')
      }
    },
  },
  mounted() {
    this.$bus.$on('removeKeyword', () => {
      this.keyword = '' // 清空文本框
    })
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>