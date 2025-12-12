import server from "@/utils/request";
import type { QueryParam } from "../form";

/**
 * @type LoginLogObj 登录日志日志数据类型
 */
export type LoginLogObj = {
  browser?: string;
  createBy?: string;
  createTime?: string;
  infoId: string;
  ipaddr?: string;
  loginLocation?: string;
  loginTime?: string;
  msg?: string;
  os?: string;
  remark?: string;
  status?: string;
  updateBy?: string;
  updateTime?: string;
  userName?: string;
};

/**
 * 查询登录日志列表
 * @param query 查询条件
 * @returns
 */
export function list(query: LoginLogObj & QueryParam) {
  return server.request<LoginLogObj>({
    url: "/monitor/logininfor/list",
    method: "get",
    params: query,
  });
}

/**
 * 删除登录日志
 * @param infoId 日志id
 * @returns
 */
export function delLogininfor(infoId: string) {
  return server.request({
    url: "/monitor/logininfor/" + infoId,
    method: "delete",
  });
}

/**
 * 解锁用户登录状态
 * @param userName 用户名称
 * @returns
 */
export function unlockLogininfor(userName: string) {
  return server.request({
    url: "/monitor/logininfor/unlock/" + userName,
    method: "get",
  });
}

/**
 * 清空登录日志
 * @returns
 */
export function cleanLogininfor() {
  return server.request({
    url: "/monitor/logininfor/clean",
    method: "delete",
  });
}
