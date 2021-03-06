import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
          component: () => import('@/views/publish')
        },
        {
          neme: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'publish-Edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        {
          name: 'article-comment',
          path: '/comment',
          component: () => import('@/views/comment')
        },
        {
          name: 'user-info',
          path: '/accouut',
          component: () => import('@/views/accouut')
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
  nprogress.start()
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

router.afterEach((to, from) => {
  nprogress.done()
})
export default router
