<template>
    <div class="home">
        <div v-for="item in romList" :key="item.code" class="romItem" @click="goToGame(item.code)">
            <img :src="`${config.serverUrl}/romStatic/img/${item.code}.jpg`" alt="" />
            <div class="romName">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import config from '../config/index'

export default {
    name: 'HomeView',
    setup() {
        const romList = ref([])
        const router = useRouter()
        // 获取游戏列表
        axios.get(`${config.serverUrl}/romStatic/romList.json`).then(res => {
            romList.value = res.data
        })
        const goToGame = code => {
            router.push({ name: 'playGround', query: { code } })
        }
        return {
            romList,
            goToGame,
            config,
        }
    },
    components: {},
}
</script>

<style lang="less">
.home {
    padding: 16px 0;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
    background-color: #2c3e50;
    display: flex;
    flex-wrap: wrap;
    //text-align: center;
    .romItem {
        display: inline-block;
        width: 33vw;
        height: 40vw;
        text-align: center;
        img {
            width: 30vw;
            height: 30vw;
        }
        .romName {
            height: 6vw;
            font-size: 16px;
            color: white;
            line-height: 6vw;
            text-align: center;
        }
    }
}
</style>
