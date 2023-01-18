const { defineConfig } = require('@vue/cli-service')
const VConsolePlugin = require('vconsole-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  configureWebpack:{
    plugins:[
      new VConsolePlugin({ enable: !isProd}),
    ],
    optimization: {
      minimize:isProd,
    },
  },
  
  devServer: {
    open: true, // 自动启动浏览器
    host:'localhost',
    port: 8080,
    https: false,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://smartclass.imwork.net',
        ws: true,
        changOrigin: true, //跨域
        pathRewrite: {
          '^/api': '', // 重写,
        },
      },
    },
  },
})
