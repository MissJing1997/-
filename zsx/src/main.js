// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'
// import { getToken } from '@/utils/auth'
import '@/icons'
import App from './App'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (getToken()) {

  next()
  // } else {
  //   /* has no token */
  //   next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
  //   NProgress.done()
  // }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
