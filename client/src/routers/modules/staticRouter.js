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
    redirect: '/expressAdd',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isAside:false,
          isBread:false
        },
      },
      {
        path: '/expressManage/expressAdd',
        name: 'expressAdd',
        component: () => import('@/views/expressAdd/index.vue'),
        meta: {
          title: '新增快递订单',
          isAside:true,
          isBread:true
        },
      },
      {
        path: '/expressManage/expressQuery',
        name: 'expressQuery',
        component: () => import('@/views/expressQuery/index.vue'),
        meta: {
          title: '快递查询',
          isAside:true,
          isBread:true
        },
      },
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
