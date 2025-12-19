<template>
  <el-form>
    <el-form-item>
      <el-radio v-model="radioValue" :label="1">分钟，允许的通配符[, - * /]</el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="2">
        周期从
        <el-input-number v-model="cycle01" :min="0" :max="58" />
        -
        <el-input-number v-model="cycle02" :min="cycle01 + 1" :max="59" />
        分钟
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="3">
        从
        <el-input-number v-model="average01" :min="0" :max="58" />
        分钟开始， 每
        <el-input-number v-model="average02" :min="1" :max="59 - average01" />
        分钟执行一次
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="4">
        指定
        <el-select v-model="checkboxList" clearable placeholder="可多选" multiple :multiple-limit="10">
          <el-option v-for="item in 60" :key="item" :label="item - 1" :value="item - 1" />
        </el-select>
      </el-radio>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup name="CompCrontabMin">
import { computed, ref, watch } from "vue";
import { checkNumber, type CrontabKey, type CrontabObj } from "./crontab";

const emit = defineEmits<{
  /**
   * 更新数据
   * @param name 日期关键字
   * @param value 值
   */
  (event: "update", name: CrontabKey, value: string): void;
}>();

const props = withDefaults(
  defineProps<{
    /**
     * @type CrontabObj Crontab表达式对象
     */
    cron: CrontabObj;
  }>(),
  {
    cron: () => {
      return {
        second: "*",
        min: "*",
        hour: "*",
        day: "*",
        month: "*",
        week: "?",
        year: "",
      };
    },
  },
);

const radioValue = ref(1);
const cycle01 = ref(0);
const cycle02 = ref(1);
const average01 = ref(0);
const average02 = ref(1);
const checkboxList = ref<number[]>([]);
const checkCopy = ref([0]);
const cycleTotal = computed(() => {
  return cycle01.value + "-" + cycle02.value;
});
const averageTotal = computed(() => {
  return average01.value + "/" + average02.value;
});
const checkboxString = computed(() => {
  return checkboxList.value.join(",");
});
watch(
  () => props.cron.min,
  (value) => changeRadioValue(value),
);
watch([radioValue, cycleTotal, averageTotal, checkboxString], () => onRadioChange());

/**
 * 日期改变重新计算规则
 * @param value
 */
function changeRadioValue(value: string) {
  if (value === "*") {
    radioValue.value = 1;
  } else if (value.indexOf("-") > -1) {
    const indexArr = value.split("-");
    cycle01.value = checkNumber(Number(indexArr[0]), 0, 58);
    cycle02.value = checkNumber(Number(indexArr[1]), cycle01.value + 1, 59);
    radioValue.value = 2;
  } else if (value.indexOf("/") > -1) {
    const indexArr = value.split("/");
    average01.value = checkNumber(Number(indexArr[0]), 0, 58);
    average02.value = checkNumber(Number(indexArr[1]), 1, 59 - average01.value);
    radioValue.value = 3;
  } else {
    checkboxList.value = [...new Set<number>(value.split(",").map((item) => Number(item)))];
    radioValue.value = 4;
  }
}

/**
 * 单选按钮值变化时，重新计算规则
 */
function onRadioChange() {
  switch (radioValue.value) {
    case 1:
      emit("update", "min", "*");
      break;
    case 2:
      emit("update", "min", cycleTotal.value);
      break;
    case 3:
      emit("update", "min", averageTotal.value);
      break;
    case 4:
      if (checkboxList.value.length === 0 && checkCopy.value[0]) {
        checkboxList.value.push(checkCopy.value[0]);
      } else {
        checkCopy.value = checkboxList.value;
      }
      emit("update", "min", checkboxString.value);
      break;
  }
}
</script>

<style lang="less" scoped>
.el-input-number--small,
.el-select,
.el-select--small {
  margin: 0 0.2rem;
}

.el-select,
.el-select--small {
  width: 19.8rem;
}
</style>
