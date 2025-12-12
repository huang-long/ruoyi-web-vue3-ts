<template>
  <div class="popup-result">
    <p class="title">最近5次运行时间</p>
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
import { getCrontabValue, isValidCrontabStr } from "./crontab.ts";
import type { DateArrObj } from "./crontab.ts";

const props = withDefaults(
  defineProps<{
    ex?: string;
  }>(),
  {
    ex: "",
  },
);

const dayRule = ref("");
let dayRuleSup: number[] | number | undefined | string;
const dateArr: DateArrObj = {
  second: [],
  min: [],
  hour: [],
  day: [],
  month: [],
  week: [],
  year: [],
};
const resultList = ref<string[]>([]);
const isShow = ref(false);
watch(
  () => props.ex,
  () => expressionChange(),
);
// 表达式值变化时，开始去计算结果
function expressionChange() {
  if (!isValidCrontabStr(props.ex)) {
    return;
  }
  // 计算开始-隐藏结果
  isShow.value = false;
  // 获取规则数组[0秒、1分、2时、3日、4月、5星期、6年]
  const ruleObj = getCrontabValue(props.ex);
  // 用于记录进入循环的次数
  let nums = 0;
  // 用于暂时存符号时间规则结果的数组
  const resultArr: string[] = [];
  // 获取当前时间精确至[年、月、日、时、分、秒]
  const nTime = new Date();
  const nYear = nTime.getFullYear();
  let nMonth = nTime.getMonth() + 1;
  let nDay = nTime.getDate();
  let nHour = nTime.getHours();
  let nMin = nTime.getMinutes();
  let nSecond = nTime.getSeconds();
  // 根据规则获取到近100年可能年数组、月数组等等
  getSecondArr(ruleObj.second);
  getMinArr(ruleObj.min);
  getHourArr(ruleObj.hour);
  getDayArr(ruleObj.day);
  getMonthArr(ruleObj.month);
  getWeekArr(ruleObj.week);
  getYearArr(ruleObj.year, nYear);
  // 将获取到的数组赋值-方便使用
  const sDate = dateArr.second;
  const mDate = dateArr.min;
  const hDate = dateArr.hour;
  const DDate = dateArr.day;
  const MDate = dateArr.month;
  const YDate = dateArr.year;
  // 获取当前时间在数组中的索引
  let sIdx = getIndex(sDate, nSecond);
  let mIdx = getIndex(mDate, nMin);
  let hIdx = getIndex(hDate, nHour);
  let DIdx = getIndex(DDate, nDay);
  let MIdx = getIndex(MDate, nMonth);
  const YIdx = getIndex(YDate, nYear);
  // 重置月日时分秒的函数(后面用的比较多)
  const resetSecond = function () {
    sIdx = 0;
    nSecond = sDate[sIdx] ?? 0;
  };
  const resetMin = function () {
    mIdx = 0;
    nMin = mDate[mIdx] ?? 0;
    resetSecond();
  };
  const resetHour = function () {
    hIdx = 0;
    nHour = hDate[hIdx] ?? 0;
    resetMin();
  };
  const resetDay = function () {
    DIdx = 0;
    nDay = DDate[DIdx] ?? 1;
    resetHour();
  };
  const resetMonth = function () {
    MIdx = 0;
    nMonth = MDate[MIdx] ?? 1;
    resetDay();
  };
  // 如果当前年份不为数组中当前值
  if (YIdx && nYear !== YDate[YIdx]) {
    resetMonth();
  }
  // 如果当前月份不为数组中当前值
  if (MIdx && nMonth !== MDate[MIdx]) {
    resetDay();
  }
  // 如果当前“日”不为数组中当前值
  if (DIdx && nDay !== DDate[DIdx]) {
    resetHour();
  }
  // 如果当前“时”不为数组中当前值
  if (hIdx && nHour !== hDate[hIdx]) {
    resetMin();
  }
  // 如果当前“分”不为数组中当前值
  if (mIdx && nMin !== mDate[mIdx]) {
    resetSecond();
  }
  // 循环年份数组
  goYear: for (let Yi = YIdx; Yi && Yi < YDate.length; Yi++) {
    const YY = YDate[Yi];
    // 如果到达最大值时
    const maxMM = MDate[MDate.length - 1] ?? 12;
    if (nMonth > maxMM) {
      resetMonth();
      continue;
    }
    // 循环月份数组
    goMonth: for (let Mi = MIdx; Mi && Mi < MDate.length; Mi++) {
      // 赋值、方便后面运算
      const mt = MDate[Mi] ?? 1;
      const MM = mt < 10 ? "0" + mt : mt.toString();
      // 如果到达最大值时
      const maxD = DDate[DDate.length - 1] ?? 28;
      if (nDay > maxD) {
        resetDay();
        if (Mi === MDate.length - 1) {
          resetMonth();
          continue goYear;
        }
        continue;
      }
      // 循环日期数组
      goDay: for (let Di = DIdx; Di && Di < DDate.length; Di++) {
        // 赋值、方便后面运算
        let DD = DDate[Di] ?? 1;
        let thisDD = DD < 10 ? "0" + DD : DD;
        // 如果到达最大值时
        const maxH = hDate[hDate.length - 1] ?? 23;
        if (nHour > maxH) {
          resetHour();
          if (Di === DDate.length - 1) {
            resetDay();
            if (Mi === MDate.length - 1) {
              resetMonth();
              continue goYear;
            }
            continue goMonth;
          }
          continue;
        }
        // 判断日期的合法性，不合法的话也是跳出当前循环
        if (checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true && dayRule.value !== "workDay" && dayRule.value !== "lastWeek" && dayRule.value !== "lastDay") {
          resetDay();
          continue goMonth;
        }
        // 如果日期规则中有值时
        if (dayRule.value === "lastDay") {
          // 如果不是合法日期则需要将前将日期调到合法日期即月末最后一天
          if (checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true) {
            while (DD > 0 && checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true) {
              DD--;
              thisDD = DD < 10 ? "0" + DD : DD;
            }
          }
        } else if (dayRule.value === "workDay") {
          // 校验并调整如果是2月30号这种日期传进来时需调整至正常月底
          if (checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true) {
            while (DD > 0 && checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true) {
              DD--;
              thisDD = DD < 10 ? "0" + DD : DD;
            }
          }
          // 获取达到条件的日期是星期X
          const thisWeek = formatDate(new Date(YY + "-" + MM + "-" + thisDD + " 00:00:00"), "week");
          // 当星期日时
          if (thisWeek === "1") {
            // 先找下一个日，并判断是否为月底
            DD++;
            thisDD = DD < 10 ? "0" + DD : DD;
            // 判断下一日已经不是合法日期
            if (checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true) {
              DD -= 3;
            }
          } else if (thisWeek === "7") {
            // 当星期6时只需判断不是1号就可进行操作
            if (dayRuleSup !== 1) {
              DD--;
            } else {
              DD += 2;
            }
          }
        } else if (dayRule.value === "weekDay") {
          // 如果指定了是星期几
          // 获取当前日期是属于星期几
          const thisWeek = formatDate(new Date(YY + "-" + MM + "-" + DD + " 00:00:00"), "week");
          // 校验当前星期是否在星期池（dayRuleSup）中
          if (typeof dayRuleSup === "string" && thisWeek && dayRuleSup.indexOf(thisWeek) < 0) {
            // 如果到达最大值时
            if (Di === DDate.length - 1) {
              resetDay();
              if (Mi === MDate.length - 1) {
                resetMonth();
                continue goYear;
              }
              continue goMonth;
            }
            continue;
          }
        } else if (dayRule.value === "assWeek") {
          // 如果指定了是第几周的星期几
          // 获取每月1号是属于星期几
          const thisWeek = Number(formatDate(new Date(YY + "-" + MM + "-" + DD + " 00:00:00"), "week"));
          if (dayRuleSup instanceof Array) {
            const sDay = dayRuleSup[0] ?? 1;
            const eDay = dayRuleSup[1] ?? 28;
            if (eDay >= thisWeek) {
              DD = (sDay - 1) * 7 + eDay - thisWeek + 1;
            } else {
              DD = sDay * 7 + eDay - thisWeek + 1;
            }
          }
        } else if (dayRule.value === "lastWeek") {
          // 如果指定了每月最后一个星期几
          // 校验并调整如果是2月30号这种日期传进来时需调整至正常月底
          if (checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true) {
            while (DD > 0 && checkDate(YY + "-" + MM + "-" + thisDD + " 00:00:00") !== true) {
              DD--;
              thisDD = DD < 10 ? "0" + DD : DD;
            }
          }
          // 获取月末最后一天是星期几
          const thisWeek = Number(formatDate(new Date(YY + "-" + MM + "-" + thisDD + " 00:00:00"), "week"));
          // 找到要求中最近的那个星期几
          if (typeof dayRuleSup === "number" && dayRuleSup < thisWeek) {
            DD -= thisWeek - dayRuleSup;
          } else if (typeof dayRuleSup === "number" && dayRuleSup > thisWeek) {
            DD -= 7 - (dayRuleSup - thisWeek);
          }
        }
        // 判断时间值是否小于10置换成“05”这种格式
        const DDstr = DD < 10 ? "0" + DD : DD.toString();
        // 循环“时”数组
        goHour: for (let hi = hIdx; hi && hi < hDate.length; hi++) {
          let h = hDate[hi] ?? 0;
          const hh = h < 10 ? "0" + h : h;
          // 如果到达最大值时
          const maxM = mDate[mDate.length - 1] ?? 59;
          if (nMin > maxM) {
            resetMin();
            if (hi === hDate.length - 1) {
              resetHour();
              if (Di === DDate.length - 1) {
                resetDay();
                if (Mi === MDate.length - 1) {
                  resetMonth();
                  continue goYear;
                }
                continue goMonth;
              }
              continue goDay;
            }
            continue;
          }
          // 循环"分"数组
          goMin: for (let mi = mIdx; mi && mi < mDate.length; mi++) {
            const m = mDate[mi] ?? 0;
            const mm = m < 10 ? "0" + m : m;
            // 如果到达最大值时
            const maxS = sDate[sDate.length - 1] ?? 59;
            if (nSecond > maxS) {
              resetSecond();
              if (mi === mDate.length - 1) {
                resetMin();
                if (hi === hDate.length - 1) {
                  resetHour();
                  if (Di === DDate.length - 1) {
                    resetDay();
                    if (Mi === MDate.length - 1) {
                      resetMonth();
                      continue goYear;
                    }
                    continue goMonth;
                  }
                  continue goDay;
                }
                continue goHour;
              }
              continue;
            }
            // 循环"秒"数组
            for (let si = sIdx; si && si <= sDate.length - 1; si++) {
              const s = sDate[si] ?? 0;
              const ss = s < 10 ? "0" + s : s;
              // 添加当前时间（时间合法性在日期循环时已经判断）
              if (MM !== "00" && DDstr !== "00") {
                resultArr.push(YY + "-" + MM + "-" + DDstr + " " + hh + ":" + mm + ":" + ss);
                nums++;
              }
              // 如果条数满了就退出循环
              if (nums === 5) break goYear;
              // 如果到达最大值时
              if (si === sDate.length - 1) {
                resetSecond();
                if (mi === mDate.length - 1) {
                  resetMin();
                  if (hi === hDate.length - 1) {
                    resetHour();
                    if (Di === DDate.length - 1) {
                      resetDay();
                      if (Mi === MDate.length - 1) {
                        resetMonth();
                        continue goYear;
                      }
                      continue goMonth;
                    }
                    continue goDay;
                  }
                  continue goHour;
                }
                continue goMin;
              }
            } //goSecond
          } //goMin
        } //goHour
      } //goDay
    } //goMonth
  }
  // 判断100年内的结果条数
  if (resultArr.length === 0) {
    resultList.value = ["没有达到条件的结果！"];
  } else {
    resultList.value = resultArr;
    if (resultArr.length !== 5) {
      resultList.value.push("最近100年内只有上面" + resultArr.length + "条结果！");
    }
  }
  // 计算完成-显示结果
  isShow.value = true;
}
// 用于计算某位数字在数组中的索引
function getIndex(arr: number[], value: number) {
  const i = arr.findIndex((item) => item === value);
  return i + 1;
}
// 获取"年"数组
function getYearArr(rule: string, year: number) {
  dateArr.year = getOrderArr(year, year + 100);
  if (rule !== undefined) {
    if (rule.indexOf("-") >= 0) {
      dateArr.year = getCycleArr(rule, year + 100, false);
    } else if (rule.indexOf("/") >= 0) {
      dateArr.year = getAverageArr(rule, year + 100);
    } else if (rule !== "*") {
      dateArr.year = getAssignArr(rule);
    }
  }
}
// 获取"月"数组
function getMonthArr(rule: string) {
  dateArr.month = getOrderArr(1, 12);
  if (rule.indexOf("-") >= 0) {
    dateArr.month = getCycleArr(rule, 12, false);
  } else if (rule.indexOf("/") >= 0) {
    dateArr.month = getAverageArr(rule, 12);
  } else if (rule !== "*") {
    dateArr.month = getAssignArr(rule);
  }
}
// 获取"日"数组-主要为日期规则
function getWeekArr(rule: string) {
  // 只有当日期规则的两个值均为“”时则表达日期是有选项的
  if (dayRule.value === "" && dayRuleSup === "") {
    if (rule.indexOf("-") >= 0) {
      dayRule.value = "weekDay";
      dayRuleSup = getCycleArr(rule, 7, false);
    } else if (rule.indexOf("#") >= 0) {
      dayRule.value = "assWeek";
      const matchRule = rule.match(/[0-9]{1}/g);
      matchRule && matchRule.length > 0 && (dayRuleSup = [Number(matchRule[1]), Number(matchRule[0])]);
      dateArr.day = [1];
      if (dayRuleSup[1] === 7) {
        dayRuleSup instanceof Array && (dayRuleSup[1] = 0);
      }
    } else if (rule.indexOf("L") >= 0) {
      dayRule.value = "lastWeek";
      const r = rule.match(/[0-9]{1,2}/g);
      r && r.length > 0 && (dayRuleSup = Number(r[0]));
      dateArr.day = [31];
      if (dayRuleSup === 7) {
        dayRuleSup = 0;
      }
    } else if (rule !== "*" && rule !== "?") {
      dayRule.value = "weekDay";
      dayRuleSup = getAssignArr(rule);
    }
  }
}
// 获取"日"数组-少量为日期规则
function getDayArr(rule: string) {
  dateArr.day = getOrderArr(1, 31);
  dayRule.value = "";
  dayRuleSup = "";
  if (rule.indexOf("-") >= 0) {
    dateArr.day = getCycleArr(rule, 31, false);
    dayRuleSup = "null";
  } else if (rule.indexOf("/") >= 0) {
    dateArr.day = getAverageArr(rule, 31);
    dayRuleSup = "null";
  } else if (rule.indexOf("W") >= 0) {
    dayRule.value = "workDay";
    const r = rule.match(/[0-9]{1,2}/g);
    r && r.length > 0 && (dayRuleSup = Number(r[0]));
    dayRuleSup && typeof dayRuleSup === "number" && (dateArr.day = [dayRuleSup]);
  } else if (rule.indexOf("L") >= 0) {
    dayRule.value = "lastDay";
    dayRuleSup = "null";
    dateArr.day = [31];
  } else if (rule !== "*" && rule !== "?") {
    dateArr.day = getAssignArr(rule);
    dayRuleSup = "null";
  } else if (rule === "*") {
    dayRuleSup = "null";
  }
}
// 获取"时"数组
function getHourArr(rule: string) {
  dateArr.hour = getOrderArr(0, 23);
  if (rule.indexOf("-") >= 0) {
    dateArr.hour = getCycleArr(rule, 24, true);
  } else if (rule.indexOf("/") >= 0) {
    dateArr.hour = getAverageArr(rule, 23);
  } else if (rule !== "*") {
    dateArr.hour = getAssignArr(rule);
  }
}
// 获取"分"数组
function getMinArr(rule: string) {
  dateArr.min = getOrderArr(0, 59);
  if (rule.indexOf("-") >= 0) {
    dateArr.min = getCycleArr(rule, 60, true);
  } else if (rule.indexOf("/") >= 0) {
    dateArr.min = getAverageArr(rule, 59);
  } else if (rule !== "*") {
    dateArr.min = getAssignArr(rule);
  }
}
// 获取"秒"数组
function getSecondArr(rule: string) {
  dateArr.second = getOrderArr(0, 59);
  if (rule.indexOf("-") >= 0) {
    dateArr.second = getCycleArr(rule, 60, true);
  } else if (rule.indexOf("/") >= 0) {
    dateArr.second = getAverageArr(rule, 59);
  } else if (rule !== "*") {
    dateArr.second = getAssignArr(rule);
  }
}
// 根据传进来的min-max返回一个顺序的数组
function getOrderArr(min: number, max: number) {
  const arr: number[] = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}
// 根据规则中指定的零散值返回一个数组
function getAssignArr(rule: string) {
  const arr: number[] = [];
  const assiginArr = rule.split(",");
  for (let i = 0; i < assiginArr.length; i++) {
    arr[i] = Number(assiginArr[i]);
  }
  arr.sort(compare);
  return arr;
}
// 根据一定算术规则计算返回一个数组
function getAverageArr(rule: string, limit: number) {
  const arr: number[] = [];
  const agArr = rule.split("/");
  let min = Number(agArr[0]);
  const step = Number(agArr[1]);
  while (min <= limit) {
    arr.push(min);
    min += step;
  }
  return arr;
}
// 根据规则返回一个具有周期性的数组
function getCycleArr(rule: string, limit: number, status: boolean) {
  // status--表示是否从0开始（则从1开始）
  const arr: number[] = [];
  const cycleArr = rule.split("-");
  const min = Number(cycleArr[0]);
  let max = Number(cycleArr[1]);
  if (min > max) {
    max += limit;
  }
  for (let i = min; i <= max; i++) {
    let add = 0;
    if (status === false && i % limit === 0) {
      add = limit;
    }
    arr.push(Math.round((i % limit) + add));
  }
  arr.sort(compare);
  return arr;
}
// 比较数字大小（用于Array.sort）
function compare(value1: number, value2: number) {
  if (value2 - value1 > 0) {
    return -1;
  } else {
    return 1;
  }
}
// 格式化日期格式如：2017-9-19 18:04:33
function formatDate(value: Date | number, type?: string) {
  // 计算日期相关值
  const time = typeof value == "number" ? new Date(value) : value;
  const Y = time.getFullYear();
  const M = time.getMonth() + 1;
  const D = time.getDate();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  const week = time.getDay();
  // 如果传递了type的话
  if (type === undefined) {
    return Y + "-" + (M < 10 ? "0" + M : M) + "-" + (D < 10 ? "0" + D : D) + " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  } else if (type === "week") {
    // 在quartz中 1为星期日
    return (week + 1).toString();
  }
}
// 检查日期是否存在
function checkDate(value: number | string) {
  const time = new Date(value);
  const format = formatDate(time);
  return value === format;
}
onMounted(() => {
  expressionChange();
});
</script>
