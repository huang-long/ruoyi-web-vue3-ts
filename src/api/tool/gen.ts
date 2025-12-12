import server from "@/utils/request";
import type { QueryParam } from "../form";

/**
 * @type GenEColumn 数据表列-类型
 */
export type GenEColumn = {
  columnName?: string;
  columnComment?: string;
};

/**
 * @type GenTColumn 数据表-类型
 */
export type GenTColumn = {
  tableName?: string;
  tableComment?: string;
  columns?: GenEColumn[];
};

/**
 * @type GenInfoObj 业务数据-类型
 */
export type GenInfoObj = {
  subTableName?: string;
  subTableFkName?: string;
  tplWebType?: string;
  tplCategory?: string;
  packageName?: string;
  moduleName?: string;
  businessName?: string;
  functionName?: string;
  treeName?: string;
  genType?: string;
  parentMenuId?: string;
  genPath?: string;
  treeCode?: string;
  columns?: GenEColumn[];
  treeParentCode?: string;
  params?: {
    treeCode?: string;
    treeName?: string;
    treeParentCode?: string;
    parentMenuId?: string;
  };
  tableId?: string;
  tableName?: string;
  tableComment?: string;
  className?: string;
  functionAuthor?: string;
  remark?: string;
};

/**
 * 查询生成表数据
 * @param query 查询条件
 * @returns
 */
export function listTable(query: GenTColumn & QueryParam) {
  return server.request<GenInfoObj>({
    url: "/tool/gen/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询db数据库列表
 * @param query 查询条件
 * @returns
 */
export function listDbTable(query: GenTColumn & QueryParam) {
  return server.request<GenInfoObj>({
    url: "/tool/gen/db/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询表详细信息
 * @param tableId 表id
 * @returns
 */
export function getGenTable(tableId: string) {
  return server.request<{
    rows?: GenEColumn[];
    info?: GenInfoObj;
    tables?: GenTColumn[];
  }>({
    url: "/tool/gen/" + tableId,
    method: "get",
  });
}

/**
 * 修改代码生成信息
 * @param data 业务数据
 * @returns
 */
export function updateGenTable(data: GenInfoObj) {
  return server.request({
    url: "/tool/gen",
    method: "put",
    data: data,
  });
}

/**
 * 导入表
 * @param data 表名称
 * @returns
 */
export function importTable(data: { tables: string }) {
  return server.request({
    url: "/tool/gen/importTable",
    method: "post",
    params: data,
  });
}

/**
 * 预览生成代码
 * @param tableId 表名id
 * @returns
 */
export function previewTable(tableId: string) {
  return server.request<{ [key: string]: string }>({
    url: "/tool/gen/preview/" + tableId,
    method: "get",
  });
}

/**
 * 删除表数据
 * @param tableId 表名id
 * @returns
 */
export function delTable(tableId: string) {
  return server.request({
    url: "/tool/gen/" + tableId,
    method: "delete",
  });
}

/**
 * 生成代码（自定义路径）
 * @param tableName 表名称
 * @returns
 */
export function genCode(tableName: string) {
  return server.request({
    url: "/tool/gen/genCode/" + tableName,
    method: "get",
  });
}

/**
 * 同步数据库
 * @param tableName 表名称
 * @returns
 */
export function synchDb(tableName: string) {
  return server.request({
    url: "/tool/gen/synchDb/" + tableName,
    method: "get",
  });
}
