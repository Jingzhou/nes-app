<template>
    <div class="home">
        <div v-for="item in romList" :key="item.code" class="romItem" @click="goToGame(item.code)">
            <img :src="`http://81.69.30.66:9999/romStatic/img/${item.code}.jpg`" alt="" />
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

export default {
    name: 'HomeView',
    setup() {
        const romList = ref([])
        const router = useRouter()
        // 获取游戏列表
        axios.get('http://localhost:9999/romStatic/romList.json').then(res => {
            romList.value = res.data
        })
        const goToGame = code => {
            router.push({ name: 'playGround', query: { code } })
        }
        return {
            romList,
            goToGame,
        }
    },
    components: {},
}
</script>

<style lang="less">
.home {
    padding: 16px 0;
    height: 100vh;
    overflow-y: auto;
    background-color: #2c3e50;
    text-align: center;
    .romItem {
        display: inline-block;
        width: 33vw;
        height: 40vw;
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
