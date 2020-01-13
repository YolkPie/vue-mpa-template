# 项目名称
- **技术支持**：该项目基于 `vue`，由`yujihu`创建于 `2020`年 `1`月 `1`日。
- **前后端分离情况**：
  >- 前后端分离开发；
  >- 静态资源由`前端`上线；
  >- 域名由`前端`申请。
- **项目说明**：***

### 目录
- [项目名称](#项目名称)
    - [1.项目特性](#1项目特性)
    - [2.项目功能](#2项目功能)
    - [3.相关链接](#3相关链接)
    - [4.相关页面](#4相关页面)
    - [5.相关指令](#5相关指令)
    - [6.本地开发](#6本地开发)
    - [7.关键目录](#7关键目录)
      - [1.页面容器](#1页面容器)
      - [2.页面视图](#2页面视图)
      - [3.页面路由](#3页面路由)
      - [4.页面状态](#4页面状态)
    - [8.跨域问题](#8跨域问题)
    - [9.编译打包（上预发、上线流程）](#9编译打包上预发上线流程)
      - [上线](#上线)
      - [上预发](#上预发)
    - [10.相关文档](#10相关文档)
      - [1.prd文档（erp@**）](#1prd文档erp)
      - [2.后端接口文档（erp@**）](#2后端接口文档erp)
      - [3.设计稿（erp@**）](#3设计稿erp)
      - [4.外部依赖等其他文档](#4外部依赖等其他文档)
    - [11.目录结构](#11目录结构)
    - [12.上线日志](#12上线日志)
    - [13.关联项目](#13关联项目)
    - [14.注意事项](#14注意事项)
    - [15.其他说明](#15其他说明)
      - [1.环境变量与模式](#1环境变量与模式)
      - [2.开发PC端页面](#2开发pc端页面)
      - [3.commit message 规范](#3commit-message-规范)
      - [4.代码规范与格式化](#4代码规范与格式化)

<!-- /TOC -->

### 1.项目特性
>* [Vue CLI 3](https://cli.vuejs.org/zh/)
>* [Vue](https://cn.vuejs.org/index.html)
>* [VueX](https://vuex.vuejs.org/zh/)
>* [Vue Router](https://router.vuejs.org/zh/)
>* [axios](https://www.kancloud.cn/yunye/axios/234845)
>* [Workbox离线存储](https://webpack.docschina.org/guides/progressive-web-application/)
>* [better-scroll处理移动端滚动](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)
>* [postcss-pxtorem自动将px转成rem，计算规则为： 750px设计稿 -----> 7.5rem](https://github.com/cuth/postcss-pxtorem)
>* [Commitizen规范git commit](https://juejin.im/post/5bd2debfe51d457abc710b57)
>* [抽取loading效果到html，降低首屏空白时间](https://www.jb51.net/article/146109.htm)
>* 伪元素 + transform 解决Retina屏1像素问题
>* @yolkpie/utils [前端工具类库](https://www.npmjs.com/package/@yolkpie/utils)

### 2.项目功能
- [x] 功能点1
- [ ] 功能点2


### 3.相关链接

- 线上域名：[https://**.*.com](https://**.*.com)
- 预发域名：[https://**.*.com](https://**.*.com)
- 代码库地址：[https://**.*.com](https://**.*.com)
- 上线地址：[https://**.*.com](https://**.*.com)

### 4.相关页面
- 页面1：[https://**.*.com](https://**.*.com)

### 5.相关指令
```
$ npm install           # 安装依赖
$ npm run serve         # 运行项目（本地开发）
$ npm run build         # 生产环境打包
$ npm run build:prod    # 生产环境打包
$ npm run build:yufa    # 预发环境打包
$ npm run build:test    # 测试环境打包
$ npm run dist          # 本地预览打包文件
```

### 6.本地开发

1. `npm install`(安装package.json下项目依赖)；
2. 运行`npm run new`指令生成新页面（会要求你输入页面名称，例如：home）：
>- 在`src/pages`目录下生成页面容器
>- 在`src/views`目录下生成页面视图
>- 在`src/router`目录下生成页面路由
>- 在`src/store`目录下生成页面状态
3. `npm run serve`(安装成功后启动项目)；
4. 项目在本地`localhost:80/[页面名称].html`端口运行。

### 7.关键目录
关键目录及文件均可通过指令生成
#### 1.页面容器
***src/pages/[页面名称]***

该目录用于组织页面容器相关文件，主要包括`页面模板`、`页面入口`以及`页面根vue实例`。
#### 2.页面视图
***src/views/[页面名称]***

该目录用于组织页面级视图组件相关文件，主要包括`页面视图模板`、`页面视图入口`以及`页面视图样式`。

#### 3.页面路由
***src/router/[页面名称].js***

该文件用于组织页面路由相关逻辑。

#### 4.页面状态
***src/store/[页面名称].js***

该文件用于组织页面全局状态。

### 8.跨域问题
- 配置host：127.0.0.1 dev.*.com
- 配置devServer的proxy，配置路径为：vue.config.js -> devServer -> proxy

### 9.编译打包（上预发、上线流程）

**注意：提交代码时请使用commitzen，否则commit message不符合规范无法提交，具体参考：https://juejin.im/post/5bd2debfe51d457abc710b57**

#### 上线

1. 从Master新建分支开发，每次上预发或上线之前，都需要拉取远端master代码，保证本地master代码为最新，合并master代码；
2. 上线前：切换到本地master分支，合并开发分支代码到本地master分支；
3. `npm run build`打包代码。检查**deploy/index.html**中是否为线上域名（ '//api.m.jd.com/api'）；
4. 提交代码至master远程；
5. 在jdos的[**应用](http://console.jdos.jd.com/#/**/image)下，进行master的编译镜像；
6. 在预发分支上先上线编译好的镜像，没有问题后，准备正式环境上线；
7. 在正式环境上线，执行滚动更新，每次1个，间隔40秒（防止线上更新代码期间无法访问）；
8. 结束后进行上线确认，否则会影响团队其他成员的上线。

#### 上预发

1. 在开发分支上执行`npm run build:yufa`打包代码；
2. 提交代码至分支远程；
3. 在jdos的[**应用](http://console.jdos.jd.com/#/**/image)下，进行开发分支a的编译镜像，上预发。

### 10.相关文档

#### 1.prd文档（erp@**）

* [设计说明](http://**.jd.com)
* [埋点](http://**.jd.com)

#### 2.后端接口文档（erp@**）

* [商详页](http://**.jd.com)
* [订单&优惠券](http://**.jd.com)

#### 3.设计稿（erp@**）

* [设计稿](http://**.jd.com)
* [交互稿](http://**.jd.com)

#### 4.外部依赖等其他文档

* [文档1](http://**.jd.com)
* [文档2](http://**.jd.com)

### 11.目录结构

```
├── dist                           # 打包后生成的文件
├── node_modules                   # 安装的依赖
├── public                         # 静态资源文件夹
└── src
    ├── api                        # 接口
    ├── assets                     # 项目依赖的一些静态资源
    ├── components                 # 公共组件
        ├── skeletons              # 页面骨架屏
    ├── config                     # 公共配置
    ├── directives                 # vue指令
    ├── filters                    # vue过滤器
    ├── mixin                      # vue混入
    ├── plugins                    # 插件
    ├── request                    # 网络请求相关
    ├── router                     # vue-router
    ├── store                      # vuex
    ├── styles                     # 公共样式
    ├── pages                      # 页面容器
    ├── views                      # 页面视图组件
├── .browserslistrc                # 在不同的前端工具间共享目标浏览器
├── .editorconfig                  # 统一代码风格
├── .env                           # 环境变量，在所有的环境中被载入
├── .env.prod                      # 环境变量，在生产环境被载入
├── .env.test                      # 环境变量，在测试环境被载入
├── .env.yufa                      # 环境变量，在预发环境被载入
├── .eslintrc.js                   # 代码检查配置文件
├── .gitignore                     # git忽略文件
├── .huskyrc                       # 阻止错误的 git 提交
├── babel.config.js                # 代码转换规则
├── package.json                   # npm包描述文件
├── package-lock.json              # 记录当前状态下实际安装的各个npm package的具体来源和版本号
├── postcss.config.js              # css转换规则
├── README.md                      # 项目说明
├── vue.config.js                  # vue-cli配置文件
```

### 12.上线日志

- 2019.6.10上线1.0.0版本，---首次上线，***等基础功能
- 2019.7.13上线1.0.1版本，---修复 *bug,增加 *功能

### 13.关联项目

### 14.注意事项

1. 上线出问题后，及时用上一个镜像资源重新上线，不要回滚。
2. 上线与上预发的打包指令存在区别。
3. 全局安装commitzen提交代码，规范git commit message，具体参考：https://juejin.im/post/5bd2debfe51d457abc710b57

### 15.其他说明
#### 1.环境变量与模式
https://cli.vuejs.org/zh/guide/mode-and-env.html

本模板主要包括四种模式，通常一种模式会对应多个环境变量。通常情况下后端的API会有多个指向不同环境的域名（测试、预发、线上）
>* 开发模式：本地开发，通过修改 `.env` 文件中的 `REQUEST_URL` 变量来请求不同后端环境API
>* 测试模式：对应后端测试环境API域名
>* 预发模式：对应后端预发环境API域名
>* 生产模式：对应后端线上环境API域名

例如以 vue-cli-service build --mode prod 命令进行打包，会在prod模式下加载可能存在的 .env、.env.prod 和 .env.prod.local 文件然后构建出生产环境应用。

可以替换项目根目录中的下列文件来指定环境变量：
```
.env         # 在所有环境中被载入
.env.test    # 在测试环境中被载入
.env.yufa    # 在预发环境中被载入
.env.prod    # 在生产环境中被载入
```
以.env.prod文件为例：
```
# 左边是变量名(一般大写，下划线分割单词)，右边是变量值
NODE_ENV = "production"
REQUEST_URL = "//api.m.jd.com"
```
只有以 `VUE_APP_` 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。可以在应用的代码中这样访问它们：
```javascript
console.log(process.env.VUE_APP_SECRET)
```
非 `VUE_APP_` 开头的变量需要手动嵌入到客户端侧的包中
```javascript
config.plugin('define')
    .tap(args => {
        args[0]['process.env'].REQUEST_URL = JSON.stringify(process.env.REQUEST_URL)
        return args
    })
```
除了 VUE_APP_* 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：
>* NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。
>* BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。

#### 2.开发PC端页面
本模板主要针对移动端开发，采用rem作为尺寸单位，为此使用postcss插件，自动将px转换成rem，同时根据屏幕宽度自动计算根字体大小。

如果想要开发PC页面则需要将上述特性移除：

- 移除postcss的pxtorem插件，配置路径为：postcss.config.js -> postcss-pxtorem
- 移除对根字体大小的计算，配置路径为：main.js -> rem

#### 3.commit message 规范
全局安装commitzen提交代码，规范git commit message，具体参考：https://juejin.im/post/5bd2debfe51d457abc710b57

#### 4.代码规范与格式化
代码规范标准为`standard`，建议使用`prettier`格式化代码，代码编辑使用`VS Code`，安装`prettier`扩展，`shift + alt + f` 格式化代码。也可以运行 `npm run lint`修复不符合规范的代码。

注意：书写的代码不符合规范将无法提交代码。
