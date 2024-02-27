<template>
  <div v-if="showTags" class="tags">
    <ul>
      <li v-for="item in tagsList" :key="item.path" class="tags-li" :class="{ active: isActive(item.path) }">
        <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
        <span class="tags-li-icon" @click="closePage(item)">
          <el-icon>
            <Close />
          </el-icon>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup name="TagsViewLayout">
import { computed, watch } from "vue";
import tagsViewStore, { type Tag } from "@/stores/tagsView";
import permissionStore from "@/stores/permission";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isActive = (path: string) => {
  return path === route.fullPath;
};

const tStore = tagsViewStore();
const pStore = permissionStore();
const tagsList = computed(() => tStore.tagsList);
const showTags = computed(() => tagsList.value.length > 0);

watch(
  () => tStore.activePath,
  (value) => {
    value != route.fullPath && router.push(value);
  }
);

watch(
  () => route.fullPath,
  (value) => {
    tStore.activePath = route.fullPath;
    value && setTags();
  }
);

// 关闭单个标签
const closePage = (tag: Tag) => {
  tStore.closePage(tag.path);
};

// 设置标签
const setTags = () => {
  // 更新tags数据
  if (pStore.isTagsRouter(route.meta.fullPath || "")) {
    tStore.updateTagsItem({
      name: route.name,
      title: route.meta.title || "",
      path: route.fullPath,
      cachedViews: route.meta.cachedViews,
      fullPath: route.meta.fullPath,
    });
  }
};

// 当前路由地址
tStore.activePath = route.fullPath;
// setTags(route);
// onBeforeRouteLeave((to) => {
//   setTags(to);
// });

// 关闭全部标签
const closeAll = () => {
  tStore.clearAllTags();
  router.push("/index");
};
// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item) => {
    return item.path === route.fullPath;
  });
  tStore.closeTagsOther(curItem);
};
const handleTags = (command: string) => {
  command === "other" ? closeOther() : closeAll();
};

// 关闭当前页面的标签页
// store.commit("closeCurrentTag", {
//     $router: router,
//     $route: route
// });
</script>

<style lang="less" scoped>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;

  ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0;

    .tags-li {
      float: left;
      margin: 3px 5px 2px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 23px;
      line-height: 23px;
      border: 1px solid #e9eaec;
      background: #fff;
      padding: 0 5px 0 12px;
      vertical-align: middle;
      color: #666;
      -webkit-transition: all 0.3s ease-in;
      -moz-transition: all 0.3s ease-in;
      transition: all 0.3s ease-in;
      display: flex;
      justify-content: center;

      .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
      }

      .tags-li-icon {
        display: flex;
        align-items: center;
      }
    }

    .tags-li:not(.active):hover {
      background: #f8f8f8;
    }

    .tags-li.active {
      color: #fff;
      border: 1px solid #409eff;
      background-color: #409eff;

      .tags-li-title {
        color: #fff;
      }
    }
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;

    .el-icon {
      margin-left: 5px;
    }

    button {
      width: 100px;
      height: 27px;
    }
  }
}
</style>
