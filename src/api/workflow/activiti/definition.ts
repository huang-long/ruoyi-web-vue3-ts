import server from "@/utils/request";
import type { QueryParam } from "../../form";

/**
 * @type ActDefinitionObj 流程定义信息数据类型
 */
export type ActDefinitionObj = {
  id: string;
  key?: string;
  name?: string;
  category?: string;
  version?: string;
  description?: string;
  deploymentId?: string;
  suspendState?: number;
};

/**
 * 查询流程定义信息列表
 * @param query 查询条件
 * @returns
 */
export function listDefinition(query: ActDefinitionObj & QueryParam) {
  return server.request<ActDefinitionObj>({
    url: "/activiti/processDefinition/list",
    method: "get",
    params: query,
  });
}

/**
 * 挂起\激活\转换 流程
 * @param data 流程定义信息
 * @returns
 */
export function suspendOrActiveApply(data: ActDefinitionObj) {
  return server.request({
    url: "/activiti/processDefinition/suspendOrActiveApply",
    method: "post",
    data: data,
  });
}

/**
 * 删除流程
 * @param id 流程id
 * @returns
 */
export function delDefinition(id: string) {
  return server.request({
    url: "/activiti/processDefinition/remove/" + id,
    method: "delete",
  });
}

/**
 * 流程定义转成模型
 * @param data 流程id
 * @returns
 */
export function convert2Model(data: { processDefinitionId: string }) {
  return server.request({
    url: "/activiti/processDefinition/convert2Model",
    method: "post",
    params: data,
  });
}

/**
 * 上传并部署流程定义
 * @param data 流程文件bpmn.xml
 * @returns
 */
export function uploadDefinition(data: { file: File }) {
  return server.request({
    url: "/activiti/processDefinition/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  });
}
