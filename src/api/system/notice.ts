import server from "@/utils/request";

/**
 * @type NoticeObj 公告数据类型
 */
export type NoticeObj = {
  noticeId: string;
  noticeTitle?: string;
  noticeType?: string;
  createBy?: string;
  noticeContent?: string;
  status?: string;
};

/**
 * 查询公告列表
 * @param query 查询条件
 * @returns
 */
export function listNotice(query: NoticeObj & { pageNum: number; pageSize: number }) {
  return server.request<NoticeObj>({
    url: "/system/notice/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询公告详细
 * @param noticeId 公告id
 * @returns
 */
export function getNotice(noticeId: string) {
  return server.request<NoticeObj>({
    url: "/system/notice/" + noticeId,
    method: "get",
  });
}

/**
 * 新增公告
 * @param data 公告数据
 * @returns
 */
export function addNotice(data: NoticeObj) {
  return server.request({
    url: "/system/notice",
    method: "post",
    data: data,
  });
}

/**
 * 修改公告
 * @param data 公告数据
 * @returns
 */
export function updateNotice(data: NoticeObj) {
  return server.request({
    url: "/system/notice",
    method: "put",
    data: data,
  });
}

/**
 * 删除公告
 * @param noticeId 公告id
 * @returns
 */
export function delNotice(noticeId: string) {
  return server.request({
    url: "/system/notice/" + noticeId,
    method: "delete",
  });
}
