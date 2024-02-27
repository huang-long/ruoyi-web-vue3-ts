<template>
  <div ref="rightPanelRef" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="indexLayout">
import { computed, watch, onMounted, onBeforeMount, ref } from "vue";
import settingsStore from "@/stores/settings";

const store = settingsStore();
const rightPanelRef = ref<HTMLDivElement>();
const props = defineProps({
  clickNotClose: {
    default: false,
    type: Boolean,
  },
});
const show = computed({
  get: () => store.showSettings,
  set: (val) => store.changeSetting("showSettings", val),
});

const closeSidebar = (evt: MouseEvent) => {
  const parent = (evt.target as HTMLElement)?.closest(".el-drawer__body");
  if (!parent) {
    show.value = false;
    window.removeEventListener("click", closeSidebar);
  }
};

const addEventClick = () => {
  window.addEventListener("click", closeSidebar);
};

const insertToBody = () => {
  const body = document.querySelector("body");
  rightPanelRef.value && body?.insertBefore(rightPanelRef.value, body.firstChild);
};

watch(show, (value) => {
  if (value && !props.clickNotClose) {
    addEventClick();
  }
});
onMounted(() => {
  insertToBody();
  addEventClick();
});

onBeforeMount(() => {
  rightPanelRef.value?.remove();
});
</script>

<style lang="less" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
