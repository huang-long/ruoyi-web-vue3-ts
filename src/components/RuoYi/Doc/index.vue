<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script lang="ts" setup name="RuoyiDocCmpt">
const goto = () => {
  window.open("http://doc.ruoyi.vip/ruoyi-vue");
};
</script>
