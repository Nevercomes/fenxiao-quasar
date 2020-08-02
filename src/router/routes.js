
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
    path: '/success',
    name: 'SuccessPage',
    component: () => import('pages/SysSuccess.vue')
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
        // 单纯的设置keepAlive只缓存的了页面数据，没有缓存scroll的位置
        meta: { keepAlive: true, isUseCache: true }
      },
      {
        path: 'signup/qrcode',
        name: 'SignUpQrCode',
        component: () => import('pages/SignUpQrCode.vue')
      },
      {
        path: 'signup/statistic',
        name: 'SignUpStatistic',
        component: () => import('pages/SignUpStatistic.vue')
      }
    ]
  },
  {
    path: '/signup',
    name: 'SignUpStudent',
    component: () => import('pages/SignUpStudent.vue')
  },
  {
    path: '/signup/teacher',
    name: 'SignUpTeacher',
    component: () => import('pages/SignUpTeacher.vue')
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
