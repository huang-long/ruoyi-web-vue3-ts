<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
  </div>
</template>

<script lang="ts" setup name="ScreenfullCmpt">
import { ElMessage } from "element-plus";
import screenfull from "screenfull";
import { ref, onMounted, onBeforeUnmount } from "vue";

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on("change", change);
  }
};

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage({ message: "你的浏览器不支持全屏", type: "warning" });
    return false;
  }
  screenfull.toggle();
};

const isFullscreen = ref(false);

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change);
  }
});
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
