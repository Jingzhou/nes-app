module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
        },
        /**
         * 不忽略node_modules，因为vant样式需要被转换。
         */
        'postcss-px-to-viewport': {
            viewportWidth: 375,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['._ignore'], // 指定不转换为视窗单位的类，可以自定义
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
            mediaQuery: false, // 允许在媒体查询中转换`px`
        },
    },
}
