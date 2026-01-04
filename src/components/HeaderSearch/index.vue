<template>
  <div :class="{ show: show }" class="header-search">
    <el-icon class="search-icon" @click.stop="click">
      <Search />
    </el-icon>
    <el-select
      ref="headerSearchSelectRef"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="option in options" :key="option.item.path" :value="option.item" :label="option.item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script lang="ts" setup name="HeaderSearchCmpt">
import Fuse, { type FuseResult } from "fuse.js";
import { isHttp } from "@/utils/validate";
import permissionStore from "@/stores/permission";
import { nextTick, onMounted, ref, watch, watchEffect } from "vue";
import { useRouter, type RouteRecordRaw } from "vue-router";

type SearchData = {
  path: string;
  title: string[];
  query?: string;
};

const search = ref("");
const options = ref<FuseResult<SearchData>[]>([]);
const searchPool = ref<SearchData[]>([]);
const show = ref(false);
const fuse = ref<Fuse<SearchData> | undefined>(undefined);
const headerSearchSelectRef = ref();
const router = useRouter();
const pStore = permissionStore();

/**
 * 点击展开功能搜索
 */
function click() {
  show.value = !show.value;
  if (show.value) {
    headerSearchSelectRef.value && headerSearchSelectRef.value.focus();
  }
}

/**
 * 点击关闭功能搜索
 */
function close() {
  headerSearchSelectRef.value && headerSearchSelectRef.value.blur();
  options.value = [];
  show.value = false;
}

/**
 * 输入框搜索值改变触发事件
 * @param val 搜索值
 */
function change(val: SearchData) {
  const path = val.path;
  const query = val.query;
  if (isHttp(path)) {
    // http(s):// 路径新窗口打开
    const pindex = path.indexOf("http");
    window.open(path.substring(pindex, path.length), "_blank");
  } else {
    if (query) {
      router.push({ path: path, query: JSON.parse(query) });
    } else {
      router.push(path);
    }
  }

  search.value = "";
  options.value = [];
  nextTick(() => {
    show.value = false;
  });
}

/**
 * 初始化功能数据列表
 * @param list 功能数据
 */
function initFuse(list: SearchData[]) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  });
}
/**
 * 过滤掉可以在侧边栏显示的路由,并生成国际化标题
 *
 * @param routes 路由列表
 * @param prefixTitle 路由标题
 */
function generateRoutes(routes: RouteRecordRaw[], prefixTitle: string[] = []) {
  let res: SearchData[] = [];

  for (const r of routes) {
    // 跳过隐藏路由器
    if (r.meta?.hidden) {
      continue;
    }
    const data: SearchData = {
      path: r.meta?.fullPath ? r.meta?.fullPath : "/",
      title: [...prefixTitle],
    };

    if (r.meta && r.meta.title) {
      data.title = [...data.title, r.meta.title];

      if (r.redirect !== "noRedirect") {
        res.push(data);
      }
    }
    if (r.meta?.query) {
      data.query = r.meta.query;
    }

    //递归子路由
    if (r.children) {
      const tempRoutes = generateRoutes(r.children, data.title);
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes];
      }
    }
  }
  return res;
}

/**
 * 查询功能数据
 * @param query 查询值
 */
function querySearch(query: string) {
  if (query !== "") {
    options.value = fuse.value?.search(query) || [];
  } else {
    options.value = [];
  }
}

/**
 * 初始化搜索数据
 */
onMounted(() => {
  searchPool.value = generateRoutes(pStore.tagsRouters);
});

/**
 * 监听路由变化
 */
watchEffect(() => {
  searchPool.value = generateRoutes(pStore.tagsRouters);
});

/**
 * 监听显示状态
 */
watch(show, (value) => {
  if (value) {
    document.body.addEventListener("click", close);
  } else {
    document.body.removeEventListener("click", close);
  }
});

/**
 * 监听搜索数据变化
 */
watch(searchPool, (list) => {
  initFuse(list);
});
</script>

<style lang="less" scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 24px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-right: 10px;
    }
  }
}
</style>
