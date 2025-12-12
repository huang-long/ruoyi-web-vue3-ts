import server from "@/utils/request";

/**
 * @type CacheObj 缓存数据类型
 */
export type CacheObj = {
  cacheName: string;
  cacheKey: string;
  cacheValue?: string;
};

/**
 * @type CacheInfoObj 缓存统计信息类型
 */
export type CacheInfoObj = {
  info?: {
    redis_version?: string;
    redis_mode?: string;
    tcp_port?: string;
    connected_clients?: string;
    uptime_in_days?: string;
    used_memory_human?: string;
    used_cpu_user_children?: string;
    maxmemory_human?: string;
    aof_enabled?: string;
    rdb_last_bgsave_status?: string;
    instantaneous_input_kbps?: string;
    instantaneous_output_kbps?: string;
  };
  dbSize?: string;
  commandStats?: string;
};

/**
 * 查询缓存详细
 * @returns
 */
export function getCache() {
  return server.request<CacheInfoObj>({
    url: "/monitor/cache",
    method: "get",
  });
}

/**
 * 查询缓存详细
 * @returns
 */
export function listCacheName() {
  return server.request<string[]>({
    url: "/monitor/cache/getNames",
    method: "get",
  });
}

/**
 * 查询缓存键名列表
 * @param cacheName 缓存名字
 * @returns
 */
export function listCacheKey(cacheName: string) {
  return server.request<string[]>({
    url: "/monitor/cache/getKeys/" + cacheName,
    method: "get",
  });
}

/**
 * 查询缓存内容
 * @param cacheName 缓存名称
 * @param cacheKey 缓存key
 * @returns
 */
export function getCacheValue(cacheName: string, cacheKey: string) {
  return server.request<CacheObj>({
    url: "/monitor/cache/getValue/" + cacheName + "/" + cacheKey,
    method: "get",
  });
}

/**
 * 清理指定名称缓存
 * @param cacheName 缓存名称
 * @returns
 */
export function clearCacheName(cacheName: string) {
  return server.request({
    url: "/monitor/cache/clearCacheName/" + cacheName,
    method: "delete",
  });
}

/**
 * 清理指定键名缓存
 * @param cacheKey 缓存key
 * @returns
 */
export function clearCacheKey(cacheKey: string) {
  return server.request({
    url: "/monitor/cache/clearCacheKey/" + cacheKey,
    method: "delete",
  });
}

/**
 * 清理全部缓存
 * @returns
 */
export function clearCacheAll() {
  return server.request({
    url: "/monitor/cache/clearCacheAll",
    method: "delete",
  });
}
