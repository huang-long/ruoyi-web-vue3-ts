import server from "@/utils/request";

/**
 * @type OnlineInfoObj 在线用户数据类型
 */
export type OnlineInfoObj = {
  ipaddr?: string;
  userName?: string;
  tokenId: string;
};

/**
 * 查询在线用户列表
 * @param query 查询条件
 * @returns
 */
export function list(query: OnlineInfoObj & { pageNum: number; pageSize: number }) {
  return server.request<OnlineInfoObj>({
    url: "/monitor/online/list",
    method: "get",
    params: query,
  });
}

/**
 * 强退用户
 * @param tokenId tokenId
 * @returns
 */
export function forceLogout(tokenId: string) {
  return server.request({
    url: "/monitor/online/" + tokenId,
    method: "delete",
  });
}
