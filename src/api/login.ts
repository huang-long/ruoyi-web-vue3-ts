import server from "@/utils/request";
import type { UserInfoObj } from "./system/user";

/**
 * @type LoginReq 登录信息类型
 */
export type LoginReq = {
  username: string;
  password: string;
  confirmPassword?: string;
  rememberMe?: boolean;
  code?: string;
  uuid?: string;
};

/**
 * 登录方法
 * @param data 登录数据
 * @returns
 */
export function login(data: LoginReq) {
  return server.requestT<{ token: string }>({
    url: "/login",
    headers: {
      isToken: false,
    },
    method: "post",
    data: data,
  });
}

/**
 * 注册方法
 * @param data 注册信息
 * @returns
 */
export function register(data: LoginReq) {
  return server.request({
    url: "/register",
    headers: {
      isToken: false,
    },
    method: "post",
    data: data,
  });
}

/**
 * 获取用户详细信息
 * @returns
 */
export function getInfo() {
  return server.requestT<{
    user: UserInfoObj;
    roles: string[];
    permissions: string[];
  }>({
    url: "/getInfo",
    method: "get",
  });
}

/**
 * 退出方法
 * @returns
 */
export function logout() {
  return server.request({
    url: "/logout",
    method: "post",
  });
}

/**
 * 获取验证码
 * @returns
 */
export function getCodeImg() {
  return server.requestT<{
    captchaEnabled: boolean;
    img: string;
    uuid: string;
  }>({
    url: "/captchaImage",
    headers: {
      isToken: false,
    },
    method: "get",
    timeout: 20000,
  });
}
