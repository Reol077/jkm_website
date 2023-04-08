import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/home',
    name: 'home',
    component: () => import('../views/home/userHome.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})
 
router.afterEach(() => {
  NProgress.done() // 进度条结束
})


export default router
