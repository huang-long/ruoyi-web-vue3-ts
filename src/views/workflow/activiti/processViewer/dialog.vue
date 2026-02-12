<template>
  <div>
    <el-dialog v-model="dialogVisible" title="流程图" :fullscreen="true" draggable>
      <process-viewer class="viewer" :instance-id="viewer.instanceId" :proc-def-id="viewer.procDefId"></process-viewer>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="ProcessViewerDialog">
import { ref, watch } from "vue";
import processViewer from "./index.vue";
import { useVModel } from "@vueuse/core";

//外部参数 ################################################
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    instanceId: string; // 流程实例id
    procDefId: string; // 流程定义id
  }>(),
  {},
);

//ref ################################################
const viewer = ref({
  instanceId: "", // 流程实例id
  procDefId: "", // 流程定义id
});

//emit ################################################
const emit = defineEmits<{ (event: "update:modelValue", value: boolean): void; (event: "close"): void }>();
//computed ################################################
const dialogVisible = useVModel(props, "modelValue", emit);

//watch ################################################
watch(
  () => [props.procDefId, props.instanceId],
  () => {
    viewer.value.instanceId = props.instanceId;
    viewer.value.procDefId = props.procDefId;
  },
);
</script>

<style lang="less" scoped>
:deep(.el-dialog__body) {
  padding: 0;
  width: 100%;
  height: calc(100vh - 65px);
  overflow-y: auto;

  .viewer {
    height: 100%;
  }
}
</style>
