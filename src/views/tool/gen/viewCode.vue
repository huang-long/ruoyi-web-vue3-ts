<template>
  <!-- 预览界面 -->
  <el-dialog v-model="visible" title="代码预览" width="80%" top="5vh" append-to-body class="scrollbar">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="item in fileData"
        :key="item.value"
        :label="item.key.substring(item.key.lastIndexOf('/') + 1, item.key.indexOf('.vm'))"
        :name="item.key.substring(item.key.lastIndexOf('/') + 1, item.key.indexOf('.vm'))"
      >
        <el-link v-copyText="item.value" v-copyText:callback="copyTextSuccess" :underline="false" icon="DocumentCopy">&nbsp;复制</el-link>
        <highlightjs :language="item.fileType" :code="item.value" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup name="ViewCode">
import { previewTable } from "@/api/tool/gen";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/http";
import xml from "highlight.js/lib/languages/xml";
import sql from "highlight.js/lib/languages/sql";
import java from "highlight.js/lib/languages/java";
import { useVModel } from "@vueuse/core";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("html", html);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("java", java);

defineOptions({
  components: { highlightjs: hljsVuePlugin.component },
});

const props = withDefaults(
  defineProps<{
    /** 对应表id */
    tableId?: string;
    /** 显示窗口 */
    modelValue?: boolean;
  }>(),
  {
    tableId: "",
    modelValue: false,
  },
);

const emit = defineEmits<{ (event: "update:modelValue", value: boolean): void }>();

/** 文件名称 */
const activeName = ref("domain.java");
/** 文件数据 */
const fileData = ref<{ key: string; value: string; fileType: string }[]>([]);
/** 窗口显示隐藏 */
const visible = useVModel(props, "modelValue", emit);

/** 监听tableId重新加载数据 */
watch(
  () => props.tableId,
  () => {
    if (props.tableId) {
      loadData();
    }
  },
);

/**
 * 复制代码成功
 * @param status 成功失败状态
 */
function copyTextSuccess(status: boolean) {
  ElMessage.success(status ? "复制成功" : "复制失败");
}

/**
 * 加载生成的文件内容
 */
function loadData() {
  previewTable(props.tableId).then((response) => {
    fileData.value = [];
    if (response.data) {
      Object.entries(response.data).forEach(([key, value]) => {
        fileData.value.push({
          key: key,
          value: value,
          fileType: getFileType(key),
        });
      });
    }
    activeName.value = "domain.java";
  });
}

/**
 * 获取文件类型
 * @param fileName 文件名称
 */
function getFileType(fileName: string) {
  const fileType = !fileName ? "" : fileName.substring(fileName.lastIndexOf(".") + 1);
  switch (fileType) {
    case "java":
      return "java";
    case "vue":
      return "html";
    case "xml":
      return "xml";
    case "sql":
      return "sql";
    default:
      return "typescript";
  }
}
</script>
