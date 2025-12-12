
/**
 * @type FixedLengthArray 数组类型T,长度L
 */
export type FixedLengthArray<T, L extends number> = Array<T> & { length: L };

/**
 * @type DateArrObj 日期数据对象类型
 */
export type DateArrObj = {
  second: number[];
  min: number[];
  hour: number[];
  day: number[];
  month: number[];
  week: number[];
  year: number[];
};

/**
 * @type CrontabObj Crontab表达式对象类型
 */
export type CrontabObj = {
  second: string;
  min: string;
  hour: string;
  day: string;
  month: string;
  week: string;
  year: string;
};

/**
 * @type CrontabStr Crontab表达式字符串类型
 */
export type CrontabStr = `${string} ${string} ${string} ${string} ${string} ${string}`;

/**
 * 将表达式字符串转换为对象
 * @param expressionC 表达式字符串 例如：* * * * * ?
 * @returns 
 */
export function getCrontabValue(expressionC: CrontabStr): CrontabObj{ 
  const arr = expressionC.split(/\s+/);   
  return {
    second: arr[0] ? arr[0] : "*",
    min: arr[0] ? arr[0] : "*",
    hour: arr[0] ? arr[0] : "*",
    day: arr[0] ? arr[0] : "*",
    month: arr[0] ? arr[0] : "*",
    week: arr[0] ? arr[0] : "?",
    year: arr[0] ? arr[0] : "",
  }
}

/**
 * 判断是否为有效的 CrontabStr 格式
 * @param str 
 * @returns 
 */
export function isValidCrontabStr(str: string|undefined|null): str is CrontabStr {
  if (!str) return false;
  const parts = str.trim().split(/\s+/);
  return parts.length === 6; // 必须恰好有6个部分
}