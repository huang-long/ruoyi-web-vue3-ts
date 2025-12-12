import server from "@/utils/request";
import type { QueryParam } from "../../form";

/**
 * @type XmlMetaInfo bpmn.xml-Meta-类型
 */
export type XmlMetaInfo = {
  key?: string;
  name?: string;
  description?: string;
  version?: number;
};

/**
 * @type ActModelerObj 生效模型数据类型
 */
export type ActModelerObj = {
  id: string;
  key?: string;
  name?: string;
  version?: string;
  createTime?: string;
  lastUpdateTime?: string;
  description?: string;
  bpmnXml?: string;
  svgXml?: string;
  metaInfo?: string;
};

/**
 * 查询模型列表
 * @param query 查询条件
 * @returns
 */
export function listModeler(query: ActModelerObj & QueryParam) {
  return server.request<ActModelerObj>({
    url: "/activiti/modeler/list",
    method: "get",
    params: query,
  });
}

/**
 * 新增模型
 * @param data 模型数据
 * @returns
 */
export function addModeler(data: ActModelerObj) {
  return server.request<string>({
    url: "/activiti/modeler/create",
    method: "post",
    params: data,
  });
}

/**
 * 删除模型
 * @param modelId 模型id
 * @returns
 */
export function delModeler(modelId: string) {
  return server.request({
    url: "/activiti/modeler/remove/" + modelId,
    method: "delete",
  });
}

/**
 * 导出模型
 * @param modelId 模型id
 * @returns
 */
export function exportModeler(modelId: string) {
  return server.request({
    url: "/activiti/modeler/export/" + modelId,
    method: "get",
  });
}

/**
 * 部署模型
 * @param modelId 模型id
 * @returns
 */
export function deployModeler(modelId: string) {
  return server.request({
    url: "/activiti/modeler/deploy/" + modelId,
    method: "get",
  });
}

/**
 * 获取模型详情
 * @param modelId 模型id
 * @returns
 */
export function getModelerDetail(modelId: string) {
  return server.request<ActModelerObj>({
    url: "/activiti/modeler/detail/" + modelId,
    method: "get",
  });
}

/**
 * 更新模型
 * @param data 模型数据
 * @returns
 */
export function updateModeler(data: ActModelerObj) {
  return server.request({
    url: "/activiti/modeler/save",
    method: "put",
    data: data,
  });
}
