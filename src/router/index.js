import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, _2, savedPosition) {
    return savedPosition ? savedPosition : { top: 0, left: 0 }
  }
})

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/login')
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next('/')
  } else {
    next()
  }
})

export default router
