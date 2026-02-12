import type { ElTable, ElTree, ElUpload, FormContext, FormValidateCallback, FormValidationResult } from "element-plus";
// import type { App } from "vue";

/**
 * @type ElForm element表单数据类型
 */
export type ElForm = FormContext & {
  readonly validate: (callback?: FormValidateCallback) => FormValidationResult;
};

/**
 * @type 自定义编辑页面
 */
export type EditPage = {
  readonly show: (param?: { action: "add" | "edit" } & { [key in string]?: string }) => void;
};

/**
 * @type ElTable实例对象类型
 */
export type ElTableInstance = InstanceType<typeof ElTable>;

/**
 * @type ElTree实例对象类型
 */
export type ElTreeInstance = InstanceType<typeof ElTree>;

/**
 * @type ElUpload实例对象类型
 */
export type ElUploadInstance = InstanceType<typeof ElUpload>;

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
