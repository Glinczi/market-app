const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // TIPS 关闭eslint的校验工具
  lintOnSave: false,
  // 代理跨域 https://webpack.docschina.org/configuration/dev-server/#devserverproxy
  devServer: {
    proxy: {
      // 只要baseURL中带/api的
      // 配置好需要重启项目
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // TODO 这一行是干啥的,为啥要注销掉
        // pathRewrite: { "^/api": "" },
      },
    },
  },
  productionSourceMap: false,
});
