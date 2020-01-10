module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': { // 对于想忽略的px写成大写即可，诸如 border:1PX solid #fff;
      'rootValue': 100, // 1rem = 100px，750px设计稿 -----> 7.5rem
      'propList': ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
      // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
      // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
      'selectorBlackList': ['weui-']
    }
  }
}
