const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: IS_PROD ? './' : "./", // 默认'/'，部署应用包时的基本 URL
    lintOnSave: false,
    outputDir: 'localServer/www',
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require("os").cpus().length > 1,
    pwa: {},
    devServer: {
        // overlay: { // 让浏览器 overlay 同时显示警告和错误
        //   warnings: true,
        //   errors: true
        // },
        // open: true, // 是否打开浏览器
        // host: "localhost",
        port: "8080", // 代理端口
        // https: false,
        hotOnly: true, // 热更新
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000", // 目标代理接口地址
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // ws: true, // 是否启用websockets
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    }
};