<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-if="shouldHide('second')" label="秒">
        <CrontabSecond :cron="crontabValueObj" @update="updateCrontabValue" />
      </el-tab-pane>

      <el-tab-pane v-if="shouldHide('min')" label="分钟">
        <CrontabMin :cron="crontabValueObj" @update="updateCrontabValue" />
      </el-tab-pane>

      <el-tab-pane v-if="shouldHide('hour')" label="小时">
        <CrontabHour :cron="crontabValueObj" @update="updateCrontabValue" />
      </el-tab-pane>

      <el-tab-pane v-if="shouldHide('day')" label="日">
        <CrontabDay :cron="crontabValueObj" @update="updateCrontabValue" />
      </el-tab-pane>

      <el-tab-pane v-if="shouldHide('month')" label="月">
        <CrontabMonth :cron="crontabValueObj" @update="updateCrontabValue" />
      </el-tab-pane>

      <el-tab-pane v-if="shouldHide('week')" label="周">
        <CrontabWeek :cron="crontabValueObj" @update="updateCrontabValue" />
      </el-tab-pane>

      <el-tab-pane v-if="shouldHide('year')" label="年">
        <CrontabYear :cron="crontabValueObj" @update="updateCrontabValue" />
      </el-tab-pane>
    </el-tabs>

    <div class="popup-main">
      <div class="popup-result">
        <p class="title">时间表达式</p>
        <table>
          <thead>
            <tr>
              <th v-for="item of tabTitles" :key="item">{{ item }}</th>
              <th>Cron 表达式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span v-if="crontabValueObj.second.length < 10">{{ crontabValueObj.second }}</span>
                <el-tooltip v-else :content="crontabValueObj.second" placement="top">
                  <span>{{ crontabValueObj.second }}</span>
                </el-tooltip>
              </td>
              <td>
                <span v-if="crontabValueObj.min.length < 10">{{ crontabValueObj.min }}</span>
                <el-tooltip v-else :content="crontabValueObj.min" placement="top">
                  <span>{{ crontabValueObj.min }}</span>
                </el-tooltip>
              </td>
              <td>
                <span v-if="crontabValueObj.hour.length < 10">{{ crontabValueObj.hour }}</span>
                <el-tooltip v-else :content="crontabValueObj.hour" placement="top">
                  <span>{{ crontabValueObj.hour }}</span>
                </el-tooltip>
              </td>
              <td>
                <span v-if="crontabValueObj.day.length < 10">{{ crontabValueObj.day }}</span>
                <el-tooltip v-else :content="crontabValueObj.day" placement="top">
                  <span>{{ crontabValueObj.day }}</span>
                </el-tooltip>
              </td>
              <td>
                <span v-if="crontabValueObj.month.length < 10">{{ crontabValueObj.month }}</span>
                <el-tooltip v-else :content="crontabValueObj.month" placement="top">
                  <span>{{ crontabValueObj.month }}</span>
                </el-tooltip>
              </td>
              <td>
                <span v-if="crontabValueObj.week.length < 10">{{ crontabValueObj.week }}</span>
                <el-tooltip v-else :content="crontabValueObj.week" placement="top">
                  <span>{{ crontabValueObj.week }}</span>
                </el-tooltip>
              </td>
              <td>
                <span v-if="crontabValueObj.year.length < 10">{{ crontabValueObj.year }}</span>
                <el-tooltip v-else :content="crontabValueObj.year" placement="top">
                  <span>{{ crontabValueObj.year }}</span>
                </el-tooltip>
              </td>
              <td class="result">
                <span v-if="crontabValueString.length < 90">{{ crontabValueString }}</span>
                <el-tooltip v-else :content="crontabValueString" placement="top">
                  <span>{{ crontabValueString }}</span>
                </el-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <CrontabResult :ex="crontabValueString"></CrontabResult>

      <div class="pop_btn">
        <el-button type="primary" @click="submitFill">确定</el-button>
        <el-button type="warning" @click="clearCron">重置</el-button>
        <el-button @click="hidePopup">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="CompCrontab">
import CrontabSecond from "./second.vue";
import CrontabMin from "./min.vue";
import CrontabHour from "./hour.vue";
import CrontabDay from "./day.vue";
import CrontabMonth from "./month.vue";
import CrontabWeek from "./week.vue";
import CrontabYear from "./year.vue";
import CrontabResult from "./result.vue";
import { computed, onMounted, ref, watch } from "vue";
import type { CrontabKey, CrontabObj } from "./crontab";

const emit = defineEmits<{
  /**
   * 隐藏弹窗
   */
  (event: "hide"): void;
  /**
   * 填充表达式
   */
  (event: "fill", value: string): void;
}>();

const props = withDefaults(
  defineProps<{
    /**
     * 需要隐藏的组件，可选值
     * @type CrontabKey[]
     */
    hideComponent?: CrontabKey[];
    /**
     * crontab表达式
     */
    expression?: string;
  }>(),
  {
    hideComponent: () => [],
    expression: () => "* * * * * ?",
  },
);

const tabTitles = ref(["秒", "分钟", "小时", "日", "月", "周", "年"]);
// const tabActive = ref(0);
const hideCom = ref<string[]>([]);
const expressionC = ref<string>("");
const crontabValueObj = ref<CrontabObj>({
  second: "*",
  min: "*",
  hour: "*",
  day: "*",
  month: "*",
  week: "?",
  year: "",
});
const crontabValueString = computed(() => {
  const obj = crontabValueObj.value;
  return obj.second + " " + obj.min + " " + obj.hour + " " + obj.day + " " + obj.month + " " + obj.week + (obj.year === "" ? "" : " " + obj.year);
});
watch(expressionC, () => resolveExp());

/**
 * 控制主键是否显示
 * @param key
 */
function shouldHide(key: string) {
  return !(hideCom.value && hideCom.value.includes(key));
}

/**
 * 解析表达式
 */
function resolveExp() {
  // 反解析 表达式
  if (expressionC.value) {
    const arr = expressionC.value.split(/\s+/);
    crontabValueObj.value.second = arr[0] ? arr[0] : "*";
    crontabValueObj.value.min = arr[1] ? arr[1] : "*";
    crontabValueObj.value.hour = arr[2] ? arr[2] : "*";
    crontabValueObj.value.day = arr[3] ? arr[3] : "*";
    crontabValueObj.value.month = arr[4] ? arr[4] : "*";
    crontabValueObj.value.week = arr[5] ? arr[5] : "?";
    crontabValueObj.value.year = arr[6] ? arr[6] : "";
  } else {
    // 没有传入的表达式 则还原
    clearCron();
  }
}

/**
 * 由子组件触发，更改表达式组成的字段值
 * @param name crontab字段名
 * @param value 字段值
 */
function updateCrontabValue(name: CrontabKey, value: string) {
  crontabValueObj.value[name] = value;
}

/**
 * 隐藏弹窗
 */
function hidePopup() {
  emit("hide");
}
/**
 * 填充表达式
 */
function submitFill() {
  emit("fill", crontabValueString.value);
  hidePopup();
}

/**
 * 还原选择项
 */
function clearCron() {
  // 还原选择项
  crontabValueObj.value = {
    second: "*",
    min: "*",
    hour: "*",
    day: "*",
    month: "*",
    week: "?",
    year: "",
  };
}

/**
 * 初始化
 */
onMounted(() => {
  expressionC.value = props.expression;
  hideCom.value = props.hideComponent;
});
</script>

<style lang="less" scoped>
.pop_btn {
  text-align: center;
  margin-top: 20px;
}

.popup-main {
  position: relative;
  margin: 10px auto;
  background: #fff;
  border-radius: 5px;
  font-size: 12px;
  overflow: hidden;
}

.popup-title {
  overflow: hidden;
  line-height: 34px;
  padding-top: 6px;
  background: #f2f2f2;
}

.popup-result {
  box-sizing: border-box;
  line-height: 24px;
  margin: 25px auto;
  padding: 15px 10px 10px;
  border: 1px solid #ccc;
  position: relative;
}

.popup-result .title {
  position: absolute;
  top: -28px;
  left: 50%;
  width: 140px;
  font-size: 14px;
  margin-left: -70px;
  text-align: center;
  line-height: 30px;
  background: #fff;
}

.popup-result table {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.popup-result table td:not(.result) {
  width: 3.5rem;
  min-width: 3.5rem;
  max-width: 3.5rem;
}

.popup-result table span {
  display: block;
  width: 100%;
  font-family: arial;
  line-height: 30px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid #e8e8e8;
}

.popup-result-scroll {
  font-size: 12px;
  line-height: 24px;
  height: 10em;
  overflow-y: auto;
}
</style>
