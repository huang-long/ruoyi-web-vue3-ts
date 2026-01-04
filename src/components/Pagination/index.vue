<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-config-provider :locale="zhCn">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="background"
        :layout="layout"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts" name="PaginationCmpt">
import { scrollTo } from "@/utils/scroll-to";
import { computed } from "vue";
import { zhCn } from "element-plus/es/locales";

/**
 * 分页组件
 */
const props = withDefaults(
  defineProps<{
    /**
     * 数据总数
     */
    total: number;
    /**
     * 当前页码
     */
    page?: number;
    /**
     * 每页条数
     * @default 10
     */
    limit?: number;
    /**
     * 每页可选择的条数
     * @default [10, 20, 30, 50]
     */
    pageSizes?: number[];
    /**
     * 页码按钮的数量，当总页数超过该值时会折叠
     * @default 7
     */
    pagerCount?: number;
    /**
     * 配置项
     * @default "total, sizes, prev, pager, next, jumper"
     */
    layout?: string;
    /**
     * 是否使用背景色
     * @default true
     */
    background?: boolean;
    /**
     * 是否自动滚动到顶部
     * @default true
     */
    autoScroll?: boolean;
    /**
     * 是否隐藏
     * @default false
     */
    hidden?: boolean;
  }>(),
  {
    page: 1,
    limit: 10,
    pageSizes: () => [10, 20, 30, 50],
    pagerCount: document.body.clientWidth < 992 ? 5 : 7, // 移动端页码按钮的数量端默认值5
    layout: "total, sizes, prev, pager, next, jumper",
    background: true,
    autoScroll: true,
    hidden: false,
  },
);

const emit = defineEmits<{
  /**
   * 更新页码
   * @param val 页码
   */
  (event: "update:page", val: number): void;
  /**
   * 更新每页条数
   * @param val 每页条数
   */
  (event: "update:limit", val: number): void;
  /**
   * 分页事件
   * @param params 分页参数
   */
  (event: "pagination", params: { page: number; limit: number }): void;
}>();

/**
 * 绑定页码数据
 */
const currentPage = computed({
  get() {
    return props.page;
  },
  set(val) {
    emit("update:page", val);
  },
});
/**
 * 绑定每页条数数据
 */
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(val) {
    emit("update:limit", val);
  },
});

/**
 * 每页条数改变
 * @param val 每页条数
 */
function handleSizeChange(val: number) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1;
  }
  emit("pagination", { page: currentPage.value, limit: val });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}

/**
 * 页码改变
 * @param val 页码
 */
function handleCurrentChange(val: number) {
  emit("pagination", { page: val, limit: pageSize.value });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}

.pagination-container.hidden {
  display: none;
}
</style>
