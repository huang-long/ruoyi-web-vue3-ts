import server from "@/utils/request";

/**
 * @type DeptObj 部门数据类型
 */
export type DeptObj = {
  deptId: string;
  parentId?: string;
  deptName?: string;
  orderNum?: number;
  leader?: string;
  phone?: string;
  email?: string;
  status?: string;
  children?: DeptObj[];
};

/**
 * @type DeptObj 部门树形对象类型
 */
export type TreeDeptObj = {
  id: number;
  label: string;
  children?: TreeDeptObj[];
};

/**
 * 查询部门列表
 * @param query 查询条件
 * @returns
 */
export function listDept(query?: DeptObj) {
  return server.request<DeptObj[]>({
    url: "/system/dept/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询部门列表（排除节点）
 * @param deptId 部门id
 * @returns
 */
export function listDeptExcludeChild(deptId: string) {
  return server.request<DeptObj[]>({
    url: "/system/dept/list/exclude/" + deptId,
    method: "get",
  });
}

/**
 * 查询部门详细
 * @param deptId 部门id
 * @returns
 */
export function getDept(deptId: string) {
  return server.request<DeptObj>({
    url: "/system/dept/" + deptId,
    method: "get",
  });
}

/**
 * 新增部门
 * @param data 部门信息
 * @returns
 */
export function addDept(data: DeptObj) {
  return server.request({
    url: "/system/dept",
    method: "post",
    data: data,
  });
}

/**
 * 修改部门
 * @param data 部门信息
 * @returns
 */
export function updateDept(data: DeptObj) {
  return server.request({
    url: "/system/dept",
    method: "put",
    data: data,
  });
}

/**
 * 删除部门
 * @param deptId 部门id
 * @returns
 */
export function delDept(deptId: string) {
  return server.request({
    url: "/system/dept/" + deptId,
    method: "delete",
  });
}
