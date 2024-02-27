<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <breadcrumb></breadcrumb>
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagNames">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" name="IndexLayout" setup>
import { computed } from "vue";
import permissionStore from "@/stores/permission";
import tagsViewStore from "@/stores/tagsView";
import breadcrumb from "@/components/Breadcrumb/index.vue";
import vHeader from "./components/Header/index.vue";
import vSidebar from "./components/Sidebar/index.vue";
import vTags from "./components/TagsView/index.vue";

const pStore = permissionStore();
const tStore = tagsViewStore();
const tagNames = computed(() => {
  const names: string[] = [];
  tStore.tagsList.forEach((item) => {
    if (typeof item.name === "string" && item.cachedViews) {
      names.push(item.name);
    }
  });
  return names;
});

const collapse = computed(() => pStore.sidebarIsCollapsed);
</script>
<style lang="less" scoped>
.content-box {
  height: calc(100vh - 70px);
}
</style>
