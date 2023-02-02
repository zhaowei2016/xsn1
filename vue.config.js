const { defineConfig } = require('@vue/cli-service')
const VConsolePlugin = require('vconsole-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets-pack', // 静态资源目录 (js, css, img, fonts)  
  // publicPath:'././',
  configureWebpack: {
    plugins: [
      new VConsolePlugin({ enable: !isProd }),
    ],
    optimization: {
      minimize: true,
    },
  },
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap(args => {
      if (isProd) {
        Object.assign(args[0].terserOptions.compress, {
          drop_console: true,
          drop_debugger: true,
        })
      }
      return args
    })
    // const imagesRule = config.module.rule('images')
    // imagesRule
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end()
  },
  devServer: {
    open: true, // 自动启动浏览器
    host: 'localhost',
    port: 8088,
    https: false,
    hot: true,
    proxy: {
      // '/api': {
      //   target: 'http://smartclass.imwork.net/',
      //   ws: true,
      //   changOrigin: true, //跨域
      //   pathRewrite: {
      //     '^/api': '', // 重写,
      //   },
      // },
      '/add': {
        target: 'https://mock.apifox.cn/m1/2203087-0-default/',
        ws: true,
        changOrigin: true, //跨域
        pathRewrite: {
          '^/add': '', // 重写,
        },
      },
      '/api': {
        target: 'http://www.czxlkj.cn/api',
        ws: true,
        changOrigin: true, //跨域
        pathRewrite: {
          '^/api': '', // 重写,
        },
      },
      // '/': {
      //   target: 'http://smartclass.imwork.net/',
      //   ws: true,
      //   changOrigin: true, //跨域
      // },
    },
  },
})
