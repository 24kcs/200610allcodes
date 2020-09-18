// vue.config.js
module.exports = {
  lintOnSave:false, // 干掉eslint语法检查
  devServer: {
    proxy: {
      '/api': {
        target: 'http://182.92.128.115', // 服务器地址
        changeOrigin: true // 是否跨域
      }
    }
  }
}