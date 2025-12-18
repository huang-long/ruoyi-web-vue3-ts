<template>
  <div class="popup-result">
    <p class="popup-result-title">最近5次运行时间</p>
    <ul class="popup-result-scroll">
      <template v-if="isShow">
        <li v-for="item in resultList" :key="item">{{ item }}</li>
      </template>
      <li v-else>计算结果中...</li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="CompCrontabResult">
import { onMounted, ref, watch } from "vue";
import { CronExpressionParser } from "cron-parser";

const props = withDefaults(
  defineProps<{
    ex?: string;
  }>(),
  {
    ex: "",
  },
);

const resultList = ref<string[]>([]);
const isShow = ref(false);
watch(
  () => props.ex,
  () => expressionChange(),
);
// 表达式值变化时，开始去计算结果
function expressionChange() {
  // 计算开始-隐藏结果
  isShow.value = false;

  try {
    const options = {
      currentDate: new Date(), // 当前时间
      // endDate: '2023-01-01T00:00:00Z', // 结束时间
      // startDate: '2023-01-01T00:00:00Z', // 开始时间
      tz: "Asia/Shanghai", //时区，默认：Europe/London
      strict: true, //严格模式，默认：false
    };
    const interval = CronExpressionParser.parse(props.ex, options);

    resultList.value = interval.take(5).map((date) => date.toString());
  } catch (err) {
    console.log("没有达到条件的结果！:", err);
    resultList.value = ["没有达到条件的结果！"];
  }

  // 计算完成-显示结果
  isShow.value = true;
}

onMounted(() => {
  expressionChange();
});
</script>
<style lang="less" scoped>
.popup-result-title {
  font-weight: 600;
}
.popup-result-scroll {
  margin-left: 20px;
}
</style>
