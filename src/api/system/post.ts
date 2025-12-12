import server from "@/utils/request";

/**
 * @type PostObj 岗位数据类型
 */
export type PostObj = {
  postId: string;
  postCode?: string;
  postName?: string;
  postSort?: number;
  status?: string;
  remark?: string;
};

/**
 * 查询岗位列表
 * @param query 查询条件
 * @returns
 */
export function listPost(query: PostObj & { pageNum: number; pageSize: number }) {
  return server.request<PostObj>({
    url: "/system/post/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询岗位详细
 * @param postId 岗位id
 * @returns
 */
export function getPost(postId: string) {
  return server.request<PostObj>({
    url: "/system/post/" + postId,
    method: "get",
  });
}

/**
 * 新增岗位
 * @param data 岗位数据
 * @returns
 */
export function addPost(data: PostObj) {
  return server.request({
    url: "/system/post",
    method: "post",
    data: data,
  });
}

/**
 * 修改岗位
 * @param data 岗位数据
 * @returns
 */
export function updatePost(data: PostObj) {
  return server.request({
    url: "/system/post",
    method: "put",
    data: data,
  });
}

/**
 * 删除岗位
 * @param postId 公告id
 * @returns
 */
export function delPost(postId: string) {
  return server.request({
    url: "/system/post/" + postId,
    method: "delete",
  });
}
