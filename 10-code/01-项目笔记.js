/*
  1. 创建项目所需所有的目录:
  api:存储封装后的api接口函数的及二次封装的axios(请求拦截器和响应拦截器)
  components:普通组件
  mock:模拟后台数据
  pages:路由组件
  router:路由器配置
  store:vuex的配置
  utils:相关工具的文件
  2. 安装所需要的插件
  npm install vuex vue-router axios less less-loader
  建议:一个一个的安装
  脚手架的项目中如果样式使用的是less ,那么需要安装两个插件less less-loader
  脚手架的项目中如果样式使用的是stylus ,那么需要安装两个插件stylus stylus-loader


  3.配置路由组件:
  Home/Search/Login/Register
  4.两个普通组件:
  Header/Footer
  5.拆分各个组件
  6.TypeNav设置为全局公共组件
  7.Home组件中各个组件进行拆分
  8.二次封装axios(请求拦截器和响应拦截器)Nprogress插件,请求的时候有进度条
  9.通过PostMan工具测试接口
  10.封装api接口函数
  11.配置跨域:vue.config.js 中进行跨域的配置



1.打开api文档(读)
2.postMan测试接口(参数如何传递)
3.封装api接口(参数如何传递)
4.测试api接口(找bug,跨域,无结果,没报错)
5.封装vuex(state,mutations,actions--->随便写哪个文件都可以完成封装)
6.组件中使用(遍历,计算属性的东西)

 */