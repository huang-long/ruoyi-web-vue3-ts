<template>
  <div class="app-container">
    <el-row :gutter="20" class="mgb20">
      <el-col :span="8">
        <el-card style="height: calc(100vh - 125px)">
          <template #header>
            <Collection style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">缓存列表</span>
            <el-button style="float: right; padding: 3px 0" link type="primary" icon="Refresh" @click="refreshCacheNames()"></el-button>
          </template>
          <el-table v-loading="loading" :data="cacheNames" :height="tableHeight" highlight-current-row style="width: 100%" @row-click="getCacheKeys">
            <el-table-column label="序号" width="60" type="index"></el-table-column>

            <el-table-column label="缓存名称" align="center" prop="cacheName" :show-overflow-tooltip="true" :formatter="nameFormatter"></el-table-column>

            <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
            <el-table-column label="操作" width="60" align="center" class-name="small-padding fixed-width">
              <template #default="scope">
                <el-button link type="primary" icon="Delete" @click="handleClearCacheName(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card style="height: calc(100vh - 125px)">
          <template #header>
            <Key style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">键名列表</span>
            <el-button style="float: right; padding: 3px 0" link type="primary" icon="Refresh" @click="refreshCacheKeys()"></el-button>
          </template>
          <el-table v-loading="subLoading" :data="cacheKeys" :height="tableHeight" highlight-current-row style="width: 100%" @row-click="handleCacheValue">
            <el-table-column label="序号" width="60" type="index"></el-table-column>
            <el-table-column label="缓存键名" align="center" :show-overflow-tooltip="true" :formatter="keyFormatter"></el-table-column>
            <el-table-column label="操作" width="60" align="center" class-name="small-padding fixed-width">
              <template #default="scope">
                <el-button link type="primary" icon="Delete" @click="handleClearCacheKey(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :bordered="false" style="height: calc(100vh - 125px)">
          <template #header>
            <Document style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">缓存内容</span>
            <el-button style="float: right; padding: 3px 0" link type="primary" icon="Refresh" @click="handleClearCacheAll()">清理全部</el-button>
          </template>
          <el-form :model="cacheForm">
            <el-row :gutter="32">
              <el-col :offset="1" :span="22">
                <el-form-item label="缓存名称:" prop="cacheName">
                  <el-input v-model="cacheForm.cacheName" :read-only="true" />
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="22">
                <el-form-item label="缓存键名:" prop="cacheKey">
                  <el-input v-model="cacheForm.cacheKey" :read-only="true" />
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="22">
                <el-form-item label="缓存内容:" prop="cacheValue">
                  <el-input v-model="cacheForm.cacheValue" type="textarea" :rows="8" :read-only="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup name="CacheListPage">
import { listCacheName, listCacheKey, getCacheValue, clearCacheName, clearCacheKey, clearCacheAll, type CacheObj } from "@/api/monitor/cache";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const cacheNames = ref<string[]>([]);
const cacheKeys = ref<string[]>([]);
const cacheForm = ref<CacheObj>({
  cacheName: "",
  cacheKey: "",
});
const loading = ref(true);
const subLoading = ref(false);
const nowCacheName = ref("");
const tableHeight = ref(window.innerHeight - 200);

/** 查询缓存名称列表 */
function getCacheNames() {
  loading.value = true;
  listCacheName().then((response) => {
    cacheNames.value = response.data || [];
    loading.value = false;
  });
}

/** 刷新缓存名称列表 */
function refreshCacheNames() {
  getCacheNames();
  ElMessage.success("刷新缓存列表成功");
}

/** 清理指定名称缓存 */
function handleClearCacheName(row: CacheObj) {
  clearCacheName(row.cacheName).then(() => {
    ElMessage.success("清理缓存名称[" + row.cacheName + "]成功");
    getCacheKeys();
  });
}

/** 查询缓存键名列表 */
function getCacheKeys(row?: CacheObj) {
  const cacheName = row !== undefined ? row.cacheName : nowCacheName.value.toString();
  if (cacheName === "") {
    return;
  }
  subLoading.value = true;
  listCacheKey(cacheName).then((response) => {
    cacheKeys.value = response.data || [];
    subLoading.value = false;
    nowCacheName.value = cacheName;
  });
}

/** 刷新缓存键名列表 */
function refreshCacheKeys() {
  getCacheKeys();
  ElMessage.success("刷新键名列表成功");
}

/** 清理指定键名缓存 */
function handleClearCacheKey(cacheKey: string) {
  clearCacheKey(cacheKey).then(() => {
    ElMessage.success("清理缓存键名[" + cacheKey + "]成功");
    getCacheKeys();
  });
}

/** 列表前缀去除 */
function nameFormatter(row: CacheObj) {
  return row.cacheName.replace(":", "");
}

/** 键名前缀去除 */
function keyFormatter(cacheKey: string) {
  return cacheKey.replace(nowCacheName.value, "");
}

/** 查询缓存内容详细 */
function handleCacheValue(cacheKey: string) {
  getCacheValue(nowCacheName.value, cacheKey).then((response) => {
    response.data && (cacheForm.value = response.data);
  });
}

/** 清理全部缓存 */
function handleClearCacheAll() {
  clearCacheAll().then(() => {
    ElMessage.success("清理全部缓存成功");
  });
}

getCacheNames();
</script>
