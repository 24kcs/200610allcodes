/*
1. 全局卸载电脑中脚手架2工具
npm uninstall vue-cli -g

2. 全局安装脚手架4
npm install -g @vue/cli
或者
yarn global add @vue/cli

3. 查看当前vue的版本
vue -V

4. 通过脚手架4创建新的项目模版
vue create gshop_client

5. 此时电脑中不能再使用脚手架2的命令来下载项目啦,肿么办,安装桥接工具
npm install -g @vue/cli-init

6. 此时电脑中脚手架2/4的命令都可以下载项目了

7. npm run serve 运行项目
   npm run build 打包
   serve dist 运行打包


脚手架2和脚手架4 的区别
1) 目录及文件个数不同
2) 脚手架4的 index.html 在public目录中
3) 项目能够在浏览器中自动的打开, 在package.json中后面加--open
"serve": "vue-cli-service serve --open"
4) main.js中的创建Vue实例对象中的代码不同

// 脚手架4中的代码
new Vue({
  render: h => h(App),
}).$mount('#app')

// 脚手架2的项目中的代码
new Vue({
  el:'#app',
  components:{App},
  template:'<App/>'
})

5) 配置跨域不同---先不讲

*/