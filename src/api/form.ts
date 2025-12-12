import type { FormContext, FormValidateCallback, FormValidationResult } from "element-plus";
// import type { App } from "vue";

/**
 * @type ElForm element表单数据类型
 */
export type ElForm = FormContext & {
  readonly validate: (callback?: FormValidateCallback | undefined) => FormValidationResult;
};

/**
 * @type QueryParam 通用查询条件类型
 */
export type QueryParam = {
  pageNum: number;
  pageSize: number;
  beginTime?: string;
  endTime?: string;
  orderByColumn?: string;
  isAsc?: string;
};
