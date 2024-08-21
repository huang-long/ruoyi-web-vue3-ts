import type { RouteRecordRaw } from "vue-router";
// import Layout from '../layout/index.vue'

export const ROUTE_NAME_LAYOUT = Symbol.for("ROUTE_NAME_LAYOUT");

// 公共路由
const constantRoutes: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("@/layout/index.vue"),
    name: ROUTE_NAME_LAYOUT,
    redirect: "index",
    children: [
      {
        path: "index",
        component: () => import("@/views/index.vue"),
        name: "index",
        meta: {
          title: "首页",
          icon: "HomeFilled",
          affix: true,
          fullPath: "/index",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/redirect",
    component: () => import("@/layout/index.vue"),
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("../views/redirect.vue"),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    name: "error404",
    component: () => import("../views/error/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/401",
    name: "error401",
    component: () => import("../views/error/401.vue"),
    meta: {
      hidden: true,
    },
  },
];
export default constantRoutes;
