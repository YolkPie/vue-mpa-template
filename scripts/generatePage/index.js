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
    return
  } else {
    log(`正在生成 page 目录 ${pageDirectory}`)
    await dotExistDirectoryCreate(pageDirectory)
    log(`正在生成 skeleton 目录 ${skeletonDirectory}`)
    await dotExistDirectoryCreate(skeletonDirectory)
  }
  try {
    log(`正在生成页面 html 文件 ${inputName}.html`)
    generateFile(resolve('./template/template.html'), htmlName)
    log(`正在生成页面 js 文件 ${inputName}.js`)
    generateFile(resolve('./template/template.js'), jsName)
    log(`正在生成页面 vue 文件 ${inputName}.vue`)
    generateFile(resolve('./template/template.vue'), vueName)
    log(`正在生成骨架屏 js 文件`)
    generateFile(resolve('./template/skeleton/index.js'), skeletonJsName)
    log(`正在生成骨架屏 vue 文件`)
    generateFile(resolve('./template/skeleton/skeleton.vue'), skeletonVueName)
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
  const readerStream = fs.createReadStream(src)
  const writerStream = fs.createWriteStream(dst)
  readerStream.pipe(writerStream)
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
