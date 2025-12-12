import server from "@/utils/request";

/**
 * @type MenuObj 菜单数据类型
 */
export type MenuObj = {
  menuId: string;
  parentId?: string;
  menuName?: string;
  icon?: string;
  menuType?: string;
  orderNum?: string;
  isFrame?: string;
  isCache?: string;
  visible?: string;
  status?: string;
  query?: string;
  perms?: string;
  component?: string;
  path?: string;
  children?: MenuObj[];
};

/**
 * @type MenuObj 菜单树形数据类型
 */
export type TreeMenuObj = {
  id: number;
  label: string;
  children?: TreeMenuObj[];
};

/**
 * 查询菜单列表
 * @param query 查询提交
 * @returns
 */
export function listMenu(query?: MenuObj) {
  return server.request<MenuObj[]>({
    url: "/system/menu/list",
    method: "get",
    params: query,
  });
}

/**
 * 查询菜单详细
 * @param menuId 菜单id
 * @returns
 */
export function getMenu(menuId: string) {
  return server.request<MenuObj>({
    url: "/system/menu/" + menuId,
    method: "get",
  });
}

/**
 * 查询菜单下拉树结构
 * @returns
 */
export function treeselect() {
  return server.request<TreeMenuObj[]>({
    url: "/system/menu/treeselect",
    method: "get",
  });
}

/**
 * 根据角色ID查询菜单下拉树结构
 * @param roleId 角色id
 * @returns
 */
export function roleMenuTreeselect(roleId: string) {
  return server.requestT<{ menus: TreeMenuObj[]; checkedKeys: number[] }>({
    url: "/system/menu/roleMenuTreeselect/" + roleId,
    method: "get",
  });
}

/**
 * 新增菜单
 * @param data 菜单数据
 * @returns
 */
export function addMenu(data: MenuObj) {
  return server.request({
    url: "/system/menu",
    method: "post",
    data: data,
  });
}

/**
 * 修改菜单
 * @param data 菜单数据
 * @returns
 */
export function updateMenu(data: MenuObj) {
  return server.request({
    url: "/system/menu",
    method: "put",
    data: data,
  });
}

/**
 * 删除菜单
 * @param menuId 菜单id
 * @returns
 */
export function delMenu(menuId: string) {
  return server.request({
    url: "/system/menu/" + menuId,
    method: "delete",
  });
}
