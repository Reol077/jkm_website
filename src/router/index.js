import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/userLogin.vue')
  },

  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/forgetPass.vue')
  },

  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/userHome.vue'),
    children: [
      { path: '/home/jkm', name: 'jkm', component: () => import('../views/home/userJKM.vue') },
      { path: '/home/hsjc', name: 'hsjc', component: () => import('../views/home/userDNA.vue') },
      { path: '/home/history', name: 'history', component: () => import('../views/home/userHistory.vue') },
      { path: "/home/admin", name: 'admin', component: () => import('../views/home/userAdmin.vue') }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // to代表将要访问的路径
  // from代表从哪个路径来
  // next是一个函数，表示放行
  //    next()放行 next('/login) 强制跳转
  if (to.path === '/login' || to.path === '/forget') return next()
  // 获取token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  NProgress.start() // 进度条开始
  next()
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})


export default router
