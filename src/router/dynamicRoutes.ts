import type { RouteRecordRaw } from "vue-router";
// import Layout from '../layout/index.vue'
// import HomeView from '../views/Main.vue'

// 功能路由
const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/system/userinfo",
    component: () => import("@/layout/index.vue"),
    // redirect: 'noredirect',
    meta: {
      hidden: true,
      permissions: ["*:*:*"],
    },
    children: [
      {
        path: "profile",
        component: () => import("@/views/system/user/profile/index.vue"),
        name: "UserProfile",
        meta: {
          title: "个人中心",
          activeMenu: "/system/user",
          permissions: ["*:*:*"],
        },
      },
    ],
  },
  {
    path: "/system/user-auth",
    component: () => import("@/layout/index.vue"),
    meta: {
      hidden: true,
      permissions: ["system:user:edit"],
    },
    children: [
      {
        path: "role/:userId(\\d+)",
        component: () => import("@/views/system/user/authRole.vue"),
        name: "AuthRole",
        meta: {
          title: "分配角色",
          activeMenu: "/system/user",
          permissions: ["system:user:edit"],
        },
      },
    ],
  },
  {
    path: "/system/role-auth",
    component: () => import("@/layout/index.vue"),
    meta: {
      hidden: true,
      permissions: ["system:role:edit"],
    },
    children: [
      {
        path: "user/:roleId(\\d+)",
        component: () => import("@/views/system/role/authUser.vue"),
        name: "AuthUser",
        meta: {
          title: "分配用户",
          activeMenu: "/system/role",
          permissions: ["system:role:edit"],
        },
      },
    ],
  },
  {
    path: "/system/dict-data",
    component: () => import("@/layout/index.vue"),
    meta: {
      hidden: true,
      permissions: ["system:dict:list"],
    },
    children: [
      {
        path: "index/:dictId(\\d+)",
        component: () => import("@/views/system/dict/data.vue"),
        name: "DictData",
        meta: {
          title: "字典数据",
          activeMenu: "/system/dict",
          permissions: ["system:dict:list"],
        },
      },
    ],
  },
  // {
  //   path: '/monitor/job-log',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['monitor:job:list'],
  //   children: [
  //     {
  //       path: 'index/:jobId(\\d+)',
  //       component: () => import('@/views/monitor/job/log'),
  //       name: 'JobLog',
  //       meta: { title: '调度日志', activeMenu: '/monitor/job' }
  //     }
  //   ]
  // },
  // {
  //   path: '/tool/gen-edit',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['tool:gen:edit'],
  //   children: [
  //     {
  //       path: 'index/:tableId(\\d+)',
  //       component: () => import('@/views/tool/gen/editTable'),
  //       name: 'GenEdit',
  //       meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
  //     }
  //   ]
  // }
];
export default dynamicRoutes;
