import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 组件异步加载，实现按需加载，进去哪个页面请求那个。提高首屏渲染速度
const login = (resolve) => require(['@/pages/login'], resolve)
const home = (resolve) => require(['@/pages/home'], resolve)
const excl = (resolve) => require(['@/pages/excl'], resolve)
const content = (resolve) => require(['@/pages/content'], resolve)
const admin = (resolve) => require(['@/pages/admin'], resolve)
const page404 = (resolve) => require(['@/404'], resolve)

Vue.use(Router)

const route = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: login
  }, {
    path: '/home',
    redirect: '/excl',
    component: home,
    children: [{
      path: '/excl',
      component: excl
    }, {
      path: '/content',
      component: content,
      meta: {
        role: ['admin']
      }
    }, {
      path: '/admin',
      component: admin,
      meta: {
        role: ['admin', 'editor']
      }
    }]
  }, {
    path: '/404page',
    component: page404
  }]
})

// 须在Router里添加mete字段
route.beforeEach((to, form, next) => {
  // 在此处判断token失效与否，跳转不同路由
  let roles = localStorage.getItem('roles') ? localStorage.getItem('roles') : ''
  NProgress.start()
  // mete字段没有时 说明为admin权限
  if (to.meta && !to.meta.role) {
    next()
  } else if (to.meta && to.meta.role.length && to.meta.role.includes(roles)) {
    next()
  } else if (to.meta && to.meta.role.length && !to.meta.role.includes(roles)) {
    route.push('/404page')
  }
})

route.afterEach(() => {
  NProgress.done()
})

export default route
