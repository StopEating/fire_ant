module.exports = {

    // 选项

    //  基本路径

    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    //  构建时的输出目录

    outputDir: "dist",

    //  放置静态资源的目录

    assetsDir: "static",

    //  html 的输出路径

    indexPath: "index.html",

    //文件名哈希

    filenameHashing: true,



    lintOnSave: true,

    //  是否使用带有浏览器内编译器的完整构建版本

    runtimeCompiler: false,

    //  babel-loader 默认会跳过 node_modules 依赖。


    // 配置 webpack-dev-server 行为。

    devServer: {

        open: process.platform === 'darwin',

        host: '127.0.0.1',

        port: 8080,

        http: false,

        hotOnly: false,

        // 查阅 http://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理

        proxy: {

            '/api': {

                target: "http://106.55.103.200/8088", // 项目用到的域名

                changeOrigin: true,

                secure: false,

                pathRewrite: {

                    "^/api": ""

                }

            },

            '/foo': {

                target: '<other_url>'

            }

        }
    }

}
