const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 加上下面这行配置，注意前后的斜杠不要漏掉
  publicPath: process.env.NODE_ENV === 'production' ? '/vue/' : '/'
})