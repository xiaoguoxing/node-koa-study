/**
 * staticRouter(静态路由)
 */
export const staticRouter = [
  {
    path: '/',
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
    redirect: '/home', //HOME_URL
    children: [],
  },
];
