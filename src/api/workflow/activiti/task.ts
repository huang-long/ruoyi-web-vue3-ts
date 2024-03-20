import server from "@/utils/request";
import type { QueryParam } from "../../form";

export type ActTaskObj = {
  taskId?: string;
  taskName?: string;
  taskContent?: string;
  procDefId?: string;
  instanceId?: string;
  definitionKey?: string;
  businessKey?: string;
  instanceName?: string;
  createUser?: string;
  createUserName?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
};

export type TaskHistoryObj = {
  actId?: string;
  actName?: string;
  actType?: string;
  actKey?: string;
  definitionKey?: string;
  businessKey?: string;
  instanceId?: string;
  instanceName?: string;
  assignee?: string;
  assigneeName?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  pass?: string;
  reason?: string;
};

// 查询已办任务列表
export function queryDoneList(query: ActTaskObj & QueryParam) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/doneList",
    method: "get",
    params: query,
  });
}

// 查询代办任务列表
export function queryTodoList(query: ActTaskObj & QueryParam) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/todoList",
    method: "get",
    params: query,
  });
}

// 查询我的流程列表
export function queryMyProcess(query: ActTaskObj & QueryParam) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/myProcessList",
    method: "get",
    params: query,
  });
}

// 查询流程图相关数据
export function queryViewerData(params: { procDefId: string; instanceId: string }) {
  return server.request<{ bpmnXml: string; actList: TaskHistoryObj[] }>({
    url: `/activiti/task/viewerData`,
    method: "get",
    params: params,
  });
}

// 查询历史审批
export function queryHistoryList(query: TaskHistoryObj & QueryParam) {
  return server.request<TaskHistoryObj>({
    url: "/activiti/task/historyList",
    method: "get",
    params: query,
  });
}

// 审批任务
export function complete(params: { taskId: string; pass: string; reason?: string }) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/complete",
    method: "post",
    data: params,
  });
}
