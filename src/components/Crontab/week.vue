<template>
  <el-form>
    <el-form-item>
      <el-radio v-model="radioValue" :label="1">周，允许的通配符[, - * ? / L #]</el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="2">不指定</el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="3">
        周期从
        <el-select v-model="cycle01" clearable>
          <el-option v-for="(item, index) of weekList" :key="index" :label="item.value" :value="item.key" :disabled="item.key === 7">{{ item.value }}</el-option>
        </el-select>
        -
        <el-select v-model="cycle02" clearable>
          <el-option v-for="(item, index) of weekList" :key="index" :label="item.value" :value="item.key" :disabled="item.key <= cycle01">{{ item.value }}</el-option>
        </el-select>
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="4">
        第
        <el-input-number v-model="average01" :min="1" :max="4" />
        周的
        <el-select v-model="average02" clearable>
          <el-option v-for="item in weekList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="5">
        本月最后一个
        <el-select v-model="weekday" clearable>
          <el-option v-for="item in weekList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="6">
        指定
        <el-select v-model="checkboxList" class="multiselect" clearable placeholder="可多选" multiple :multiple-limit="6">
          <el-option v-for="item in weekList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup name="CompCrontabWeek">
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

const radioValue = ref(2);
const cycle01 = ref(2);
const cycle02 = ref(3);
const average01 = ref(1);
const average02 = ref(2);
const weekday = ref(2);
const checkboxList = ref<number[]>([]);
const checkCopy = ref([2]);
const weekList = ref([
  { key: 1, value: "星期日" },
  { key: 2, value: "星期一" },
  { key: 3, value: "星期二" },
  { key: 4, value: "星期三" },
  { key: 5, value: "星期四" },
  { key: 6, value: "星期五" },
  { key: 7, value: "星期六" },
]);
const cycleTotal = computed(() => {
  return cycle01.value + "-" + cycle02.value;
});
const averageTotal = computed(() => {
  return average02.value + "#" + average01.value;
});
const weekdayTotal = computed(() => {
  return weekday.value + "L";
});
const checkboxString = computed(() => {
  return checkboxList.value.join(",");
});
watch(
  () => props.cron.week,
  (value) => changeRadioValue(value),
);
watch([radioValue, cycleTotal, averageTotal, weekdayTotal, checkboxString], () => onRadioChange());

/**
 * 日期改变重新计算规则
 * @param value
 */
function changeRadioValue(value: string) {
  if (value === "*") {
    radioValue.value = 1;
  } else if (value === "?") {
    radioValue.value = 2;
  } else if (value.indexOf("-") > -1) {
    const indexArr = value.split("-");
    cycle01.value = checkNumber(Number(indexArr[0]), 1, 6);
    cycle02.value = checkNumber(Number(indexArr[1]), cycle01.value + 1, 7);
    radioValue.value = 3;
  } else if (value.indexOf("#") > -1) {
    const indexArr = value.split("#");
    average01.value = checkNumber(Number(indexArr[1]), 1, 4);
    average02.value = checkNumber(Number(indexArr[0]), 1, 7);
    radioValue.value = 4;
  } else if (value.indexOf("L") > -1) {
    const indexArr = value.split("L");
    weekday.value = checkNumber(Number(indexArr[0]), 1, 7);
    radioValue.value = 5;
  } else {
    checkboxList.value = [...new Set<number>(value.split(",").map((item) => Number(item)))];
    radioValue.value = 6;
  }
}

/**
 * 单选按钮值变化时，重新计算规则
 */
function onRadioChange() {
  if (radioValue.value === 2 && props.cron.day === "?") {
    emit("update", "day", "*");
  }
  if (radioValue.value !== 2 && props.cron.day !== "?") {
    emit("update", "day", "?");
  }
  switch (radioValue.value) {
    case 1:
      emit("update", "week", "*");
      break;
    case 2:
      emit("update", "week", "?");
      break;
    case 3:
      emit("update", "week", cycleTotal.value);
      break;
    case 4:
      emit("update", "week", averageTotal.value);
      break;
    case 5:
      emit("update", "week", weekdayTotal.value);
      break;
    case 6:
      if (checkboxList.value.length === 0 && checkCopy.value[0]) {
        checkboxList.value.push(checkCopy.value[0]);
      } else {
        checkCopy.value = checkboxList.value;
      }
      emit("update", "week", checkboxString.value);
      break;
  }
}
</script>

<style lang="less" scoped>
.el-input-number--small,
.el-select,
.el-select--small {
  margin: 0 0.5rem;
}

.el-select,
.el-select--small {
  width: 8rem;
}

.el-select.multiselect,
.el-select--small.multiselect {
  width: 17.8rem;
}
</style>
