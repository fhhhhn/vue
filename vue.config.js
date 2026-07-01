const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 加上下面这行配置
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/DEMO-1/'   // 把这里换成你即将在 GitHub 上创建的仓库名字
    : '/'
})