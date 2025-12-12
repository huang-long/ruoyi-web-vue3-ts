import server from "@/utils/request";
import type { QueryParam } from "../form";

/**
 * @type LeaveObj 请假任务
 */
export type LeaveObj = {
  id: string;
  createName?: string;
  processType?: string;
  department?: string;
  type?: string;
  title?: string;
  reason?: string;
  leaveStartTime?: string;
  leaveEndTime?: string;
  instanceId?: string;
  state?: string;
  createBy?: string;
  createTime?: string;
  updateTime?: string;
};

/**
 * 查询请假列表
 * @param query 查询条件
 * @returns
 */
export function listLeave(query: LeaveObj & QueryParam) {
  return server.request<LeaveObj>({
    url: "/workflow/leave/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询请假详细
 * @param id 请假信息id
 * @returns
 */
export function getLeave(id: string) {
  return server.request<LeaveObj>({
    url: "/workflow/leave/" + id,
    method: "get",
  });
}

/**
 * 新增请假
 * @param data 请假信息
 * @returns
 */
export function addLeave(data: LeaveObj) {
  return server.request({
    url: "/workflow/leave",
    method: "post",
    data: data,
  });
}

/**
 * 修改请假
 * @param data 请假信息
 * @returns
 */
export function updateLeave(data: LeaveObj) {
  return server.request({
    url: "/workflow/leave",
    method: "put",
    data: data,
  });
}

/**
 * 删除请假
 * @param id 请假信息id
 * @returns
 */
export function delLeave(id: LeaveObj) {
  return server.request({
    url: "/workflow/leave/" + id,
    method: "delete",
  });
}

/**
 * 导出请假
 * @param query 查询条件
 * @returns
 */
export function exportLeave(query: LeaveObj) {
  return server.request({
    url: "/workflow/leave/export",
    method: "get",
    params: query,
  });
}
