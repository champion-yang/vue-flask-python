
var aa = require("./src/api/prevent")
module.exports = {
  publicPath: '/',//根路径
  outputDir: 'dist',//打包生成的文件名
  devServer: {
    open: true,//启动项目后自动运行浏览器
    host: '127.0.0.1',
    port: 3000,
    proxy: {
        "/api":{
          target:"http://127.0.0.1:5000/",
          changeOrigin: true  // 是否代理
        }
    },//设置代理
    before(app) {
      aa(app)
    }

  }

}