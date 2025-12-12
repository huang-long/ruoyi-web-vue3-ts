import server from "@/utils/request";
import type { QueryParam } from "../form";

/**
 * @type JobLogObj 定时任务日志数据类型
 */
export type JobLogObj = {
  jobLogId: string;
  jobName?: string;
  jobGroup?: string;
  createTime?: string;
  invokeTarget?: string;
  jobMessage?: string;
  status?: string;
  exceptionInfo?: string;
};

/**
 * 查询调度日志列表
 * @param query 查询条件
 * @returns
 */
export function listJobLog(query: JobLogObj & QueryParam) {
  return server.request<JobLogObj>({
    url: "/monitor/jobLog/list",
    method: "get",
    params: query,
  });
}

/**
 * 删除调度日志
 * @param jobLogId 日志id
 * @returns
 */
export function delJobLog(jobLogId: string) {
  return server.request({
    url: "/monitor/jobLog/" + jobLogId,
    method: "delete",
  });
}

/**
 * 清空调度日志
 * @returns
 */
export function cleanJobLog() {
  return server.request({
    url: "/monitor/jobLog/clean",
    method: "delete",
  });
}
