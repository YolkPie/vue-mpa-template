const path = require('path')
const glob = require('glob')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')
// const pkg = require('./package.json')

const resolvePath = dir => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production'

const pagePath = './src/pages/**?/*.html'

// 配置pages多页面获取当前文件夹下的html和js
const getEntry = globPath => {
  const entries = {}
  let basename, tmp, pathname

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-3)
    pathname = basename // 正确输出js和html的路径
    entries[pathname] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      filename: tmp[2]
    }
  })
  // console.log(entries)
  return entries
}

// 获取多页html名称
const getHtmlNames = globPath => {
  const result = []
  glob.sync(globPath).forEach(function (entry) {
    result.push(path.basename(entry, path.extname(entry)))
  })
  // console.log(result)
  return result
}

module.exports = {
  // 项目部署基础
  // 默认情况下，我们假设你的应用将被部署在域的根目录下,
  // 例如：https://www.my-app.com/
  // 默认：'/'
  // 如果您的应用程序部署在子路径中，则需要在这指定子路径
  // 例如：https://www.foobar.com/my-app/
  // 需要将它改为'/my-app/'
  publicPath: isProd ? '/' : '/',
  pages: getEntry(pagePath),
  // 如果你不需要使用eslint，把 lintOnSave 设为false即可
  lintOnSave: true,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [
    '@yolkpie/utils'
  ],
  // 提供了一个 webpack 原始配置的上层抽象，
  // 使其可以定义具名的 loader 规则和具名插件，
  // 并有机会在后期进入这些规则并对它们的选项进行修改。
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolvePath('src')) // key,value自行定义，比如.set('@@', resolvePath('src/components'))
      .set('_c', resolvePath('src/components'))
      .set('_v', resolvePath('src/views'))
    // 这里是对环境的配置，不同环境对应不同的REQUEST_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].REQUEST_URL = JSON.stringify(process.env.REQUEST_URL)
      return args
    })
    const htmlList = getHtmlNames(pagePath)
    for (const item of htmlList) {
      config.plugin('html-' + item).tap(args => {
        args[0].skeleton = require(`./src/pages/${item}/skeleton`)
        return args
      })
    }
    // 对于 vue、vue-router、vuex 、axios和 element-ui 等等这些不经常改动的库，
    // 我们让webpack不对他们进行打包，通过cdn引入，
    // 可以减少代码的大小、也可以减少服务器的带宽，更能把这些文件缓存到客户端，客户端加载的会更快。
    if (isProd) {
      // 生产环境忽略打包的文件
      // 通过该配置可以告诉 webpack 在 javascript 运行环境中已经内置了哪些全局变量，
      // 不用讲这些全局变量打包到代码中而是直接使用它们
      const externals = {
        // 将导入语句中的 vue 替换成运行环境里的全局变量 Vue
        vue: 'Vue',
        // 将导入语句中的 axios 替换成运行环境里的全局变量 axios
        axios: 'axios',
        // 将导入语句中的 vue-router 替换成运行环境里的全局变量 VueRouter
        'vue-router': 'VueRouter',
        // 将导入语句中的 vuex 替换成运行环境里的全局变量 Vuex
        vuex: 'Vuex',
        // 将导入语句中的 better-scroll 替换成运行环境里的全局变量 BScroll
        'better-scroll': 'BScroll'
      }
      config.externals(externals)
      const cdn = {
        css: [],
        js: [
          // vue
          '//cdn.staticfile.org/vue/2.6.10/vue.min.js',
          // vue-router
          '//cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js',
          // vuex
          '//cdn.staticfile.org/vuex/3.1.2/vuex.min.js',
          // axios
          '//cdn.staticfile.org/axios/0.19.0/axios.min.js'
        ]
      }
      for (const item of htmlList) {
        config.plugin('html-' + item).tap(args => {
          args[0].cdn = cdn
          return args
        })
      }
    }
  },
  // 该方法的第一个参数会收到已经解析好的配置。
  // 在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack: config => {
    // config.plugins.push(new VConsolePlugin({
    //   enable: !(isProd)
    // }))
    // 构建完成通知
    // 当你启动构建时，就可以隐藏控制台面板，专心去做其他事情啦，到“点”了自然会来叫你，它的效果就是下面这样，同时还有提示音噢～
    config.plugins.push(
      new WebpackBuildNotifierPlugin({
        title: '项目构建完成',
        logo: path.resolve('./public/favicon.ico'),
        suppressSuccess: true
      })
    )
    if (isProd) {
      // 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
      // 模块的相对路径生成一个四位数的hash作为模块id
      config.plugins.push(
        new HashedModuleIdsPlugin()
      )
      // 生成sw文件，构建离线应用
      // 参考https://webpack.docschina.org/guides/progressive-web-application/
      // config.plugins.push(
      //   new WorkboxPlugin.GenerateSW({
      //     // 这些选项帮助 ServiceWorkers 快速启用
      //     // 不允许遗留任何“旧的” ServiceWorkers
      //     clientsClaim: true,
      //     skipWaiting: true
      //   })
      // )
    }
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    port: 80,
    open: true,
    openPage: 'home.html',
    disableHostCheck: true // 解决127.0.0.1指向其他域名时出现"Invalid Host header"问题
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // proxy: {
    //   // 例如将'localhost:8080/api/xxx'代理到'https://yujihu.cn/api/xxx'
    //   '/h5/api': {
    //     target: 'http://car.jd.com', // 接口的域名
    //     secure: false, // 是否验证SSL证书，如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 将主机标头的原点更改为目标URL，如果接口跨域，需要进行这个参数配置
    //     pathRewrite: {
    //       '^/h5/api': '' // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'
    //     }
    //   }
    // }
  }
}
