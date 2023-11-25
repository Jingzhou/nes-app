<template>
  <div class="home">
    <NesVue
      url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    />
  </div>
</template>

<script>
import { NesVue } from "nes-vue";
export default {
  name: "HomeView",
  components: {
    NesVue,
  },
};
</script>
