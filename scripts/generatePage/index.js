const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

log('请输入要生成的组件名称')
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()
  /**
   * 页面目录路径
   */
  const pageDirectory = resolve('../../src/pages', inputName)
  /**
   * html 文件路径
   */
  const htmlName = resolve(pageDirectory, `${inputName}.html`)
  /**
   * vue 文件路径
   */
  const vueName = resolve(pageDirectory, `${inputName}.vue`)
  /**
   * js 文件路径
   */
  const jsName = resolve(pageDirectory, `${inputName}.js`)
  /**
   * 视图目录路径
   */
  const viewDirectory = resolve('../../src/views', inputName)
  /**
   * 视图 scss 文件路径
   */
  const viewScssName = resolve(viewDirectory, `${inputName}.scss`)
  /**
   * 视图 vue 文件路径
   */
  const viewVueName = resolve(viewDirectory, `${inputName}.vue`)
  /**
   * 视图 js 文件路径
   */
  const viewJsName = resolve(viewDirectory, `index.js`)
  /**
   * router 文件路径
   */
  const storeName = resolve('../../src/store', `${inputName}.js`)
  /**
   * router 文件路径
   */
  const routerName = resolve('../../src/router', `${inputName}.js`)
  /**
   * 骨架屏目录路径
   */
  const skeletonDirectory = resolve(pageDirectory, 'skeleton')
  /**
   * 骨架屏 js 文件路径
   */
  const skeletonJsName = resolve(skeletonDirectory, 'index.js')
  /**
   * 骨架屏 vue 文件路径
   */
  const skeletonVueName = resolve(skeletonDirectory, 'skeleton.vue')
  const hasPageDirectory = fs.existsSync(pageDirectory)
  if (hasPageDirectory) {
    errorLog(`${inputName}页面目录已存在，请重新输入`)
    process.exit()
  } else {
    log(`正在生成 page 目录 ${pageDirectory}`)
    await dotExistDirectoryCreate(pageDirectory)
    log(`正在生成 skeleton 目录 ${skeletonDirectory}`)
    await dotExistDirectoryCreate(skeletonDirectory)
    log(`正在生成 view 目录 ${viewDirectory}`)
    await dotExistDirectoryCreate(viewDirectory)
  }
  try {
    log(`正在生成 store 文件 store/${inputName}.js`)
    generateFile(resolve('./template/store.js'), storeName)
    log(`正在生成 router 文件 router/${inputName}.js`)
    replaceContent(resolve('./template/router.js'), routerName, 'pageName', inputName)
    log(`正在生成页面 html 文件 pages/${inputName}.html`)
    generateFile(resolve('./template/page.html'), htmlName)
    log(`正在生成页面 vue 文件 pages/${inputName}.vue`)
    generateFile(resolve('./template/page.vue'), vueName)
    log(`正在生成页面 js 文件 pages/${inputName}.js`)
    replaceContent(resolve('./template/page.js'), jsName, 'pageName', inputName)
    log(`正在生成骨架屏 js 文件`)
    generateFile(resolve('./template/skeleton/index.js'), skeletonJsName)
    log(`正在生成骨架屏 vue 文件`)
    generateFile(resolve('./template/skeleton/skeleton.vue'), skeletonVueName)
    log(`正在生成视图 scss 文件 views/${inputName}.scss`)
    generateFile(resolve('./template/view.scss'), viewScssName)
    log(`正在生成视图 vue 文件 views/${inputName}.vue`)
    replaceContent(resolve('./template/view.vue'), viewVueName, 'viewName', inputName)
    log(`正在生成页面 js 文件 views/index.js`)
    replaceContent(resolve('./template/view.js'), viewJsName, 'viewName', inputName)
    successLog('生成成功')
  } catch (err) {
    errorLog(err.message)
  }
  process.exit()
})

function generateFile (src, dst) {
  if (fs.existsSync(dst)) {
    errorLog(`${dst}文件已存在`)
    return
  }
  const content = fs.readFileSync(src, 'utf8')
  fs.writeFileSync(dst, content, 'utf8')
}

function replaceContent (src, dst, key, value) {
  let content = fs.readFileSync(src, 'utf8')
  content = content.replace(new RegExp(`{{${key}}}`, 'gm'), value)
  fs.writeFileSync(dst, content, 'utf8')
}

function dotExistDirectoryCreate (directory) {
  return new Promise(resolve => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
