/**
 * @type CrontabKey 日期key
 */
export type CrontabKey = "second" | "min" | "hour" | "day" | "month" | "week" | "year";

/**
 * @type CrontabObj Crontab表达式对象
 */
export type CrontabObj = { [key in CrontabKey]: string };

/**
 * 校验数字范围，返回范围内数字
 * @param value
 * @param minLimit
 * @param maxLimit
 * @returns 返回范围内数字
 */
export function checkNumber(value: number, minLimit: number, maxLimit: number): number {
  // 检查必须为整数
  value = Math.floor(value);
  if (value < minLimit) {
    value = minLimit;
  } else if (value > maxLimit) {
    value = maxLimit;
  }
  return value;
}
