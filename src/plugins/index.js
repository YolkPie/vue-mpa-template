import Vue from 'vue'

const requireAll = context => context.keys().filter(path => !path.startsWith('./index')).map(context)

// 自动加载 plugins 目录下的 .js 结尾的文件
const pluginsContext = require.context('./', true, /\.js$/) // false 不遍历子目录，true遍历子目录

requireAll(pluginsContext).forEach(({
  default: plugin
}) => {
  plugin && plugin.install && Vue.use(plugin)
})
