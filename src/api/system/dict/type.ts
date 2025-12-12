import type { QueryParam } from "@/api/form";
import server from "@/utils/request";

/**
 * @type DictObj 字典分类数据类型
 */
export type DictTypeObj = {
  dictId?: string;
  dictName?: string;
  dictType?: string;
  status?: string;
  remark?: string;
};

/**
 * 查询字典类型列表
 * @param query 查询条件
 * @returns
 */
export function listType(query: DictTypeObj & QueryParam) {
  return server.request<DictTypeObj>({
    url: "/system/dict/type/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询字典类型详细
 * @param dictId 字典id
 * @returns
 */
export function getType(dictId: string) {
  return server.request<DictTypeObj>({
    url: "/system/dict/type/" + dictId,
    method: "get",
  });
}

/**
 * 新增字典类型
 * @param data 字典分类数据
 * @returns
 */
export function addType(data: DictTypeObj) {
  return server.request({
    url: "/system/dict/type",
    method: "post",
    data: data,
  });
}

/**
 * 修改字典类型
 * @param data 字典分类数据
 * @returns
 */
export function updateType(data: DictTypeObj) {
  return server.request({
    url: "/system/dict/type",
    method: "put",
    data: data,
  });
}

/**
 * 删除字典类型
 * @param dictId 字典id
 * @returns
 */
export function delType(dictId: string) {
  return server.request({
    url: "/system/dict/type/" + dictId,
    method: "delete",
  });
}

/**
 * 刷新字典缓存
 * @returns
 */
export function refreshCache() {
  return server.request({
    url: "/system/dict/type/refreshCache",
    method: "delete",
  });
}

/**
 * 获取字典选择框列表
 * @returns
 */
export function optionselect() {
  return server.request<DictTypeObj[]>({
    url: "/system/dict/type/optionselect",
    method: "get",
  });
}
