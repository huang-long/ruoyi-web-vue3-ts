import server from "@/utils/request";

/**
 * @type ServerObj 服务器资源数据类型
 */
export type ServerObj = {
  cpu?: {
    cpuNum?: number;
    used?: number;
    sys?: number;
    free?: number;
  };
  mem?: {
    total?: number;
    used?: number;
    free?: number;
    usage?: number;
  };
  jvm?: {
    total?: number;
    used?: number;
    free?: number;
    usage?: number;
    name?: string;
    version?: string;
    startTime?: string;
    runTime?: string;
    home?: string;
    inputArgs?: string;
  };
  sys?: {
    computerName?: string;
    osName?: string;
    userDir?: string;
    computerIp?: string;
    osArch?: string;
  };
  sysFiles?: {
    dirName?: string;
    sysTypeName?: string;
    typeName?: string;
    total?: number;
    free?: number;
    used?: number;
    usage?: number;
  }[];
};

/**
 * 获取服务信息
 * @returns
 */
export function getServer() {
  return server.request<ServerObj>({
    url: "/monitor/server",
    method: "get",
  });
}
