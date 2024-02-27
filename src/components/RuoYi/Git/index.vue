<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script lang="ts" setup name="RuoyiGitCmpt">
const goto = () => {
  window.open("https://gitee.com/y_project/RuoYi-Vue");
};
</script>
