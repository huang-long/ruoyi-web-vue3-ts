<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in menu">
        <template v-if="item.children && item.children.length > 0">
          <el-sub-menu :key="item.path" :index="item.path">
            <template #title>
              <el-icon v-if="item.meta?.icon">
                <component :is="item.meta?.icon" />
              </el-icon>
              <span>{{ item.meta?.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :key="subItem.path" :index="subItem.path">
                <template #title>
                  <el-icon v-if="subItem.meta?.icon">
                    <component :is="subItem.meta?.icon" />
                  </el-icon>
                  {{ subItem.meta?.title }}
                </template>
                <el-menu-item v-for="threeItem in subItem.children" :key="threeItem.path" :index="threeItem.path">
                  {{ threeItem.meta?.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :key="subItem.path + '_1'" :index="subItem.path">
                <el-icon v-if="subItem.meta?.icon">
                  <component :is="subItem.meta?.icon" />
                </el-icon>
                {{ subItem.meta?.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :key="item.path" :index="item.path">
            <el-icon v-if="item.meta?.icon">
              <component :is="item.meta?.icon" />
            </el-icon>
            <template #title>{{ item.meta?.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup name="SiderbarLayout">
import { computed } from "vue";
import permissionStore from "@/stores/permission";
import { useRoute } from "vue-router";

const route = useRoute();
const pStore = permissionStore();

const onRoutes = computed(() => {
  return route.path;
});

const menu = computed(() => pStore.sidebarMenu);
const collapse = computed(() => pStore.sidebarIsCollapsed);
</script>

<style lang="less" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  height: calc(100vh - 70px);

  .sidebar-el-menu {
    min-height: 100%;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  // .el-sub-menu {
  //   :deep(.el-sub-menu__title) {
  //     padding: 0 var(--el-menu-base-level-padding);
  //   }
  // }
}

.sidebar::-webkit-scrollbar {
  width: 0;
}
</style>
