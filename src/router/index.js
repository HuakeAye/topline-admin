import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      // name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '/',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/home')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userinfo = window.localStorage.getItem('user_info')
  if (to.path !== '/login') {
    if (!userinfo) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (userinfo) {
      next(false)
    } else {
      next()
    }
  }
})

export default router
