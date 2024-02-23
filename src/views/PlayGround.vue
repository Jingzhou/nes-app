<template>
    <div className="playGround">
        <div class="screenWrap">
            <div class="screen">
                <NesVue
                    width="100%"
                    class="nesWrap"
                    height="100%"
                    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
                />
            </div>
            <div class="setting">
                <div v-gamepad:touch="'START'">START</div>
                <div v-gamepad:touch="'SELECT'">SELECT</div>
            </div>
        </div>
        <div class="operation">
            <div class="opRightWrap">
                <div class="opRight">
                    <div class="r1">
                        <div v-gamepad:touch="'UP'">
                            <img :src="require('@/assets/handle-up.png')" alt="" />
                        </div>
                    </div>
                    <div class="r2">
                        <div v-gamepad:touch="'LEFT'">
                            <img :src="require('@/assets/handle-left.png')" alt="" />
                        </div>
                        <div v-gamepad:touch="'RIGHT'">
                            <img :src="require('@/assets/handle-right.png')" alt="" />
                        </div>
                    </div>
                    <div class="r3">
                        <div v-gamepad:touch="'DOWN'">
                            <img :src="require('@/assets/handle-down.png')" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="opLeftWrap">
                <div class="opLeft">
                    <div class="l1">
                        <div v-gamepad:touch="'D'">
                            <img :src="require('@/assets/handle-y.png')" alt="" />
                        </div>
                    </div>
                    <div class="l2">
                        <div v-gamepad:touch="'C'">
                            <img :src="require('@/assets/handle-x.png')" alt="" />
                        </div>

                        <div v-gamepad:touch="'B'">
                            <img :src="require('@/assets/handle-b.png')" alt="" />
                        </div>
                    </div>
                    <div class="l3">
                        <div v-gamepad:touch="'A'">
                            <img :src="require('@/assets/handle-a.png')" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { NesVue, vGamepad } from 'nes-vue'
</script>
<style lang="less">
.playGround {
    height: 100vh;
    background-color: #bdc1cd;
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
                height: 150px;
                width: 150px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                img {
                    height: 44px;
                    width: 44px;
                    pointer-events: none;
                }
                .r1 {
                    height: 44px;
                    width: 100%;
                }
                .r2 {
                    height: 44px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                .r3 {
                    height: 44px;
                    width: 100%;
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
                height: 150px;
                width: 150px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                img {
                    height: 44px;
                    width: 44px;
                    pointer-events: none;
                }
                .l1 {
                    height: 44px;
                    width: 100%;
                }
                .l2 {
                    height: 44px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                .l3 {
                    height: 44px;
                    width: 100%;
                }
            }
        }
    }
}
</style>
