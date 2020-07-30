
const routes = [
  {
    path: '/',
    name: 'WxLogin',
    component: () => import('pages/WxLogin.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'signup/list',
        name: 'SignUpList',
        component: () => import('pages/SignUpList.vue'),
        meta: { keepAlive: true }
      },
      {
        path: 'signup/qrcode',
        name: 'SignUpQrCode',
        component: () => import('pages/SignUpQrCode.vue'),
        meta: { keepAlive: true }
      },
      {
        path: 'signup/statistic',
        name: 'SignUpStatistic',
        component: () => import('pages/SignUpStatistic.vue'),
        meta: { keepAlive: true }
      }
    ]
  },
  {
    path: '/signup',
    name: 'SignUpStudent',
    component: () => import('pages/SignUpStudent.vue')
  },
  {
    path: '/signup/info',
    name: 'SignUpInfo',
    component: () => import('pages/SignUpInfo.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
