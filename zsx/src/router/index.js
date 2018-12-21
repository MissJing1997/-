import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// export const constantRouterMap = [
//   { path: '/login', component: () => import('@/views/login/index'), hidden: true },
//   { path: '/404', component: () => import('@/views/404'), hidden: true }

// ]
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    { path: '/login', name: 'login', component: () => import('@/views/login/index') },

    {
      path: '/layout',
      component: () => import('@/views/layout/layout'),
      redirect: '/layout/home',
      meta: {routeList: []},
      children: [
        {
          path: '/layout/home',
          name: '首页',
          component: () => import('@/views/layout/children/home')
        }, {
          path: '/layout/advertiser',
          name: '广告主管理页面',
          component: () => import('@/views/layout/children/advertiser')
        }, {
          path: '/layout/material',
          name: '广告素材管理页面',
          component: () => import('@/views/layout/children/material')
        }, {
          path: '/layout/program',
          name: '广告计划管理',
          component: () => import('@/views/layout/children/program')
        }, {
          path: '/layout/statistics',
          name: '广告统计管理',
          component: () => import('@/views/layout/children/statistics')
        }, {
          path: '/layout/thirdparty',
          name: '第三方广告计划',
          component: () => import('@/views/layout/children/thirdparty')
        }, {
          path: '/layout/system',
          name: '系统广告计划',
          component: () => import('@/views/layout/children/system')
        }, {
          path: '/layout/whitelist',
          name: '白名单管理',
          component: () => import('@/views/layout/children/whitelist')
        }
      ]
    },
    {
      path: '*',
      // redirect: '',
      hidden: true,
      component: () => import('@/views/404')
    }
    // { path: '/404', component: () => import('@/views/404')}

  ]
})
