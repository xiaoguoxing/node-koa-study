/**
 * staticRouter(静态路由)
 */
export const staticRouter = [
  {
    path: '/',
    redirect: '/layout', //HOME_URL
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    children: [
      // {
      //   path: '/test',
      //   name: 'test',
      //   component: () => import('@/views/test.vue'),
      //   meta: {
      //     title: 'test',
      //   },
      // },
      // //运管中心
      // {
      //   path: '/optCenter',
      //   name: 'optCenter',
      //   redirect: '/optCenter/aiPatrolManage/position',
      //   meta: {
      //     icon: 'Briefcase',
      //     title: '运管中心',
      //     isLink: '',
      //     isHide: false,
      //     isFull: false,
      //     isAffix: false,
      //     isKeepAlive: true,
      //   },
      //   children: [
      //     //智能巡检管理
      //     {
      //       path: '/optCenter/aiPatrolManage',
      //       name: 'aiPatrolManage',
      //       redirect: '/optCenter/aiPatrolManage/position',
      //       meta: {
      //         icon: 'Menu',
      //         title: '智能巡检管理',
      //         isLink: '',
      //         isHide: false,
      //         isFull: false,
      //         isAffix: false,
      //         isKeepAlive: true,
      //       },
      //       children: [
      //         {
      //           path: '/optCenter/aiPatrolManage/position',
      //           name: 'area',
      //           component: () => import('@/views/optCenter/aiPatrolManage/position/index.vue'),
      //           meta: {
      //             icon: 'Menu',
      //             title: '预置位配置',
      //             isLink: '',
      //             isHide: false,
      //             isFull: false,
      //             isAffix: false,
      //             isKeepAlive: true,
      //           },
      //         },
      //       ],
      //     },
      //     //巡检配置
      //     {
      //       path: '/optCenter/inspectionSet',
      //       name: 'inspectionSet',
      //       redirect: '/optCenter/inspectionSet/area',
      //       meta: {
      //         icon: 'Menu',
      //         title: '巡检配置',
      //         isLink: '',
      //         isHide: false,
      //         isFull: false,
      //         isAffix: false,
      //         isKeepAlive: true,
      //       },
      //       children: [
      //         {
      //           path: '/optCenter/inspectionSet/area',
      //           name: 'area',
      //           component: () => import('@/views/optCenter/inspectionSet/area/index.vue'),
      //           meta: {
      //             icon: 'Menu',
      //             title: '巡检区域管理',
      //             isLink: '',
      //             isHide: false,
      //             isFull: false,
      //             isAffix: false,
      //             isKeepAlive: true,
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];
