import server from "@/utils/request";
import type { QueryParam } from "../../form";

/**
 * @type ActTaskObj 任务类型
 */
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

/**
 * @type ActTaskObj 历史任务类型
 */
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
  department?: string;
  actParams?: string;
  actParamsObj?: { [key: string]: string };
};

/**
 * 查询已办任务列表
 * @param query 查询条件
 * @returns
 */
export function queryDoneList(query: ActTaskObj & QueryParam) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/doneList",
    method: "get",
    params: query,
  });
}

/**
 * 查询待办办任务列表
 * @param query 查询条件
 * @returns
 */
export function queryTodoList(query: ActTaskObj & QueryParam) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/todoList",
    method: "get",
    params: query,
  });
}

/**
 * 查询我的流程列表
 * @param query 查询条件
 * @returns
 */
export function queryMyProcess(query: ActTaskObj & QueryParam) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/myProcessList",
    method: "get",
    params: query,
  });
}

/**
 * 查询流程图相关数据
 * @param params 查询条件
 * @returns
 */
export function queryViewerData(params: { procDefId: string; instanceId: string }) {
  return server.request<{ bpmnXml: string; actList: TaskHistoryObj[] }>({
    url: `/activiti/task/viewerData`,
    method: "get",
    params: params,
  });
}

/**
 * 查询历史审批
 * @param query 查询条件
 * @returns
 */
export function queryHistoryList(query: TaskHistoryObj & QueryParam) {
  return server.request<TaskHistoryObj>({
    url: "/activiti/task/historyList",
    method: "get",
    params: query,
  });
}

/**
 * 审批任务
 * @param params 审批任务
 * @returns
 */
export function complete(params: { taskId: string; pass: string; comment?: string }) {
  return server.request<ActTaskObj>({
    url: "/activiti/task/complete",
    method: "post",
    data: params,
  });
}

/**
 * 查询已办任务列表
 * @returns
 */
export function queryTaskCount() {
  return server.get<{
    todoCount: number;
    doneCount: number;
    myProcessCount: number;
    finishCount: number;
  }>("/activiti/task/taskCount");
}
