const fs = require('fs')
const path = require('path')
const renderer = require('vue-server-renderer')
const Vue = require('vue')

const resolvePath = (src) => path.resolve(__dirname, src)

// 清除模板字符串的换行符
const clearEnter = (html) => {
  return html.replace(/[\r\n]/g, '')
}

// 从vue单文件中抽取html和css
const extractAssetsInVueTpl = (vueTplPath) => {
  // 读取loading.vue文件，并清除换行和空格
  let vueTpl = clearEnter(fs.readFileSync(vueTplPath).toString())
  // 抽取template标签中的内容
  let html = /<template>(.*)<\/template>/g.exec(vueTpl)[1]
  // 抽取style标签内的内容
  let css = /<style>(.*)<\/style>/g.exec(vueTpl)[1]

  return {
    html,
    css
  }
}

let vueAssets = null
let vueTplPath = resolvePath('./pre-render-skeleton.vue')
let skeleton = {
  html: '',
  css: ''
}

// 将vue单文件中的template和css分别抽取出来
vueAssets = extractAssetsInVueTpl(vueTplPath)

;(async function () {
  await new Promise((resolve, reject) => {
    // vue-server-render的用法自行查看吧
    let vue = new Vue({
      template: vueAssets.html
    })

    let realRenderer = renderer.createRenderer({
      // <!--vue-ssr-outlet-->会替换成vue-ssr-render渲染出来的html
      template: '<!--vue-ssr-outlet-->'
    })

    realRenderer.renderToString(vue, (err, html) => {
      if (err) reject(err)
      skeleton.html = html
      skeleton.css = '<style>' + vueAssets.css + '</style>'

      resolve()
    })
  })
})()

// 导出的loading作为html-webpack-plugin的模板参数
module.exports = skeleton
