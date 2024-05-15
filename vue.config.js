const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('@vant/auto-import-resolver')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            //当 unplugin-vue-components 版本大于等于 0.26.0 时，使用以下写法
            ComponentsPlugin.default({ resolvers: [VantResolver()] }),
        ],
    },
    devServer: {
        port: 9090,
    },
})
