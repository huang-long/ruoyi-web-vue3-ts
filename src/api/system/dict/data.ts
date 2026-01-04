import server from "@/utils/request";
import type { DictTypeObj } from "./type";

/**
 * @type DictObj 字典数据类型
 */
export type DictObj = {
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  dictCode: string;
  dictSort?: number;
  dictLabel: string;
  dictValue: string;
  dictType: string;
  cssClass?: string;
  listClass?: string;
  isDefault?: string;
  elTagType?: string;
  elTagClass?: string;
  status?: string;
  default?: boolean;  
  /**
   * 字典属性名称
   */
  label?: string;
  /**
   * 字典属性值
   */
  value?: string;
};

/**
 * 查询字典数据列表
 * @param query 查询条件
 * @returns
 */
export function listData(query: DictTypeObj & { pageNum: number; pageSize: number }) {
  return server.request<DictObj>({
    url: "/system/dict/data/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询字典数据详细
 * @param dictCode 字典编码
 * @returns
 */
export function getData(dictCode: string) {
  return server.request<DictObj>({
    url: "/system/dict/data/" + dictCode,
    method: "get",
  });
}

/**
 * 根据字典类型查询字典数据信息
 * @param dictType 字典类型
 * @returns
 */
export function getDicts(dictType: string) {
  return server.request<DictObj[]>({
    url: "/system/dict/data/type/" + dictType,
    method: "get",
  });
}

/**
 * 新增字典数据
 * @param data 字典数据
 * @returns
 */
export function addData(data: DictObj) {
  return server.request({
    url: "/system/dict/data",
    method: "post",
    data: data,
  });
}

/**
 * 修改字典数据
 * @param data 字典数据
 * @returns
 */
export function updateData(data: DictObj) {
  return server.request({
    url: "/system/dict/data",
    method: "put",
    data: data,
  });
}

/**
 * 删除字典数据
 * @param dictCode 字典编码
 * @returns
 */
export function delData(dictCode: string) {
  return server.request({
    url: "/system/dict/data/" + dictCode,
    method: "delete",
  });
}
