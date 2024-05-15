<template>
    <div className="playGround">
        <div class="screenWrap">
            <div class="screen">
                <nes-vue
                    label="点击开始游戏"
                    ref="nesRef"
                    :gain="gain"
                    width="100%"
                    class="nesWrap"
                    height="100%"
                    :url="`${config.serverUrl}/romStatic/rom/${romCode}.nes`"
                />
            </div>
            <div class="setting">
                <div v-gamepad:touch="'START'">START</div>
                <div v-gamepad:touch="'SELECT'">SELECT</div>
                <div @click="showAction">设置</div>
            </div>
        </div>
        <div class="operation">
            <div class="opRightWrap">
                <div class="opRight">
                    <div class="r1">
                        <div class="buttonUp" v-gamepad:touch="'UP'"></div>
                    </div>
                    <div class="r2">
                        <div class="buttonLeft" v-gamepad:touch="'LEFT'"></div>
                        <div class="buttonCenter"></div>
                        <div class="buttonRight" v-gamepad:touch="'RIGHT'"></div>
                    </div>
                    <div class="r3">
                        <div class="buttonDown" v-gamepad:touch="'DOWN'"></div>
                    </div>
                </div>
            </div>
            <div class="opLeftWrap">
                <div class="opLeft">
                    <div class="l1">
                        <div class="buttonAB" v-gamepad:touch="['A', 'B']">A + B</div>
                    </div>
                    <div class="l2">
                        <div class="buttonA" v-gamepad:touch="'A'">A</div>
                        <div class="buttonB" v-gamepad:touch="'B'">B</div>
                    </div>
                </div>
            </div>
        </div>
        <van-action-sheet
            v-model:show="show"
            cancel-text="取消"
            :actions="actions"
            @select="onSelect"
            @close="onClose"
        />
    </div>
</template>

<script setup>
import { NesVue, vGamepad } from 'nes-vue'
import { showNotify } from 'vant'
import 'vant/es/notify/style'
import { useRoute } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import config from '../config/index'

const query = useRoute().query
const romCode = ref(query.code)
const nesRef = ref(null)
const show = ref(false)
const gain = ref('50')
const showAction = () => {
    nesRef.value.pause()
    show.value = true
}
// 存档
const save = () => {
    nesRef.value.save(romCode.value)
    showNotify({ type: 'success', message: '存档成功' })
    nesRef.value.play()
}
// 读档
const load = () => {
    const request = window.indexedDB.open('nes-vue', 1) // 打开数据库
    // 打开成功
    request.onsuccess = function (event) {
        const db = event.target.result
        const objectStoreName = 'save_data'
        // 通过事务从指定的对象仓库中获取所有记录
        const transaction = db.transaction([objectStoreName], 'readonly')
        const store = transaction.objectStore(objectStoreName)
        const getAllRequest = store.getAll()

        getAllRequest.onsuccess = function (event) {
            const data = event.target.result // 获取返回结果
            const item = data.find(i => i.id === romCode.value)
            if (item) {
                // 有存档
                nesRef.value.load(romCode.value)
                showNotify({ type: 'success', message: '读档成功' })
            } else {
                // 无存档
                showNotify({ type: 'success', message: '暂无存档' })
            }
            nesRef.value.play()
        }
    }
}
// 重启游戏
const reset = () => {
    showNotify({ type: 'success', message: '游戏已重启' })
    nesRef.value.reset()
}
// 静音开关
const setGain = () => {
    if (gain.value === '0') {
        gain.value = '50'
        showNotify({ type: 'success', message: '静音-关' })
    } else {
        gain.value = '0'
        showNotify({ type: 'success', message: '静音-开' })
    }
    nesRef.value.play()
}

const actions = [
    { name: '存档', callback: save },
    { name: '读档', callback: load },
    { name: '重启游戏', callback: reset },
    { name: '静音(开/关)', callback: setGain },
]
const onSelect = () => {
    show.value = false
}
const onClose = () => {
    nesRef.value.play()
}

// 处理双击长按后出现放大镜的逻辑
let lastTouch = 0
let doubleTapTimer = 0

const handleTouchStart = event => {
    // 如果是长按，阻止默认行为
    if (event.touches.length > 1 || (doubleTapTimer && new Date() - lastTouch < 200)) {
        event.preventDefault()
    }
}

const handleTouchEnd = () => {
    // 记录每次触摸结束的时间
    lastTouch = new Date()
    // 如果两次触摸结束的时间间隔小于200ms，认为是双击
    if (doubleTapTimer) {
        clearTimeout(doubleTapTimer)
        // 执行自定义的双击事件处理逻辑
    } else {
        // 设置双击计时器
        doubleTapTimer = setTimeout(function () {
            // 执行自定义的单击事件处理逻辑
            doubleTapTimer = 0
        }, 200)
    }
}
onMounted(() => {
    // 添加事件监听器
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
})

onBeforeUnmount(() => {
    // 移除事件监听器
    document.removeEventListener('touchstart', handleTouchStart, { passive: false })
    document.removeEventListener('touchend', handleTouchEnd, { passive: false })
})
</script>
<style lang="less">
.playGround {
    height: 100vh;
    background-color: #bdc1cd;
    text-align: center;
    .screenWrap {
        width: calc(100vw - 48px);
        height: calc(50vh - 48px);
        padding: 48px 24px 0 24px;
        .screen {
            width: 100%;
            height: calc(100% - 48px);
            .nesWrap {
                border-radius: 8px;
            }
        }
        .setting {
            font-size: 16px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 48px;
            div {
                width: 80px;
                height: 24px;
                line-height: 24px;
                color: white;
                background-color: #2f88ff;
                border-radius: 4px;
                border: 3px solid black;
            }
        }
    }
    .operation {
        width: 100vw;
        height: 50vh;
        display: flex;
        .opRightWrap {
            width: 50vw;
            height: 50vh;
            display: flex;
            justify-content: center;
            align-items: center;
            .opRight {
                height: 144px;
                width: 144px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .r1 {
                    height: 50px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    .buttonUp {
                        width: 38px;
                        height: 47px;
                        border-top: 3px solid black;
                        border-left: 3px solid black;
                        border-right: 3px solid black;
                        background-color: #2f88ff;
                        border-radius: 8px;
                    }
                }
                .r2 {
                    height: 50px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .buttonLeft {
                        width: 47px;
                        height: 38px;
                        border-top: 3px solid black;
                        border-left: 3px solid black;
                        border-bottom: 3px solid black;
                        background-color: #2f88ff;
                        border-radius: 8px;
                    }
                    .buttonCenter {
                        width: 46px;
                        height: 46px;
                        background-color: #2f88ff;
                        border-radius: 8px;
                    }
                    .buttonRight {
                        width: 47px;
                        height: 38px;
                        border-top: 3px solid black;
                        border-right: 3px solid black;
                        border-bottom: 3px solid black;
                        background-color: #2f88ff;
                        border-radius: 8px;
                    }
                }
                .r3 {
                    height: 50px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    .buttonDown {
                        width: 38px;
                        height: 47px;
                        border-bottom: 3px solid black;
                        border-left: 3px solid black;
                        border-right: 3px solid black;
                        background-color: #2f88ff;
                        border-radius: 8px;
                    }
                }
            }
        }
        .opLeftWrap {
            width: 50vw;
            height: 50vh;
            display: flex;
            justify-content: center;
            align-items: center;
            .opLeft {
                height: 120px;
                width: 120px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .l1 {
                    height: 50px;
                    width: 100%;
                    .buttonAB {
                        line-height: 44px;
                        font-size: 18px;
                        height: 44px;
                        width: 114px;
                        border-radius: 44px;
                        border: 3px solid black;
                        background-color: #2f88ff;
                        font-weight: bold;
                    }
                }
                .l2 {
                    height: 50px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .buttonA {
                        line-height: 44px;
                        font-size: 18px;
                        height: 44px;
                        width: 44px;
                        border-radius: 44px;
                        border: 3px solid black;
                        background-color: #2f88ff;
                        font-weight: bold;
                    }
                    .buttonB {
                        line-height: 44px;
                        font-size: 18px;
                        height: 44px;
                        width: 44px;
                        border-radius: 44px;
                        border: 3px solid black;
                        background-color: #2f88ff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>
