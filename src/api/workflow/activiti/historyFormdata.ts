import server from "@/utils/request";

/**
 * @type ApprovalHisObj 请假历史信息类型
 */
export type ApprovalHisObj = {
  id: string;
  taskNodeName?: string;
  createName?: string;
  createdDate?: string;
  formHistoryDataDTO?: {
    title?: string;
    value?: string;
  }[];
};

/**
 * 查询请假详细
 * @param instanceId 实例id
 * @returns
 */
export function historyFromData(instanceId: string) {
  return server.request<ApprovalHisObj[]>({
    url: "/historyFromData/ByInstanceId/" + instanceId,
    method: "get",
  });
}
