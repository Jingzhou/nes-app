<template>
    <router-view />
</template>

<style lang="less">
html {
    margin: 0;
    border: 0;
    padding: 0;
    font-family: 'PingFang SC', miui, system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
        sans-serif;
    height: 100%;
    -webkit-touch-callout: none; /*系统默认菜单被禁用*/
    -webkit-user-select: none; /*webkit浏览器*/
    -khtml-user-select: none; /*早期浏览器*/
    -moz-user-select: none; /*火狐*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
    overflow: hidden;
    -ms-touch-action: manipulation; /* 针对IE Mobile */
    touch-action: manipulation;
}

body {
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    -ms-touch-action: manipulation; /* 针对IE Mobile */
    touch-action: manipulation;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
