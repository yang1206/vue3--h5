import router from './index'
import { useUserStore } from '@/store/index'
const whiteList = ['/login']
// let userStore: any = null
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.getToken) {
    if (to.path === '/login') {

      next('/users')

    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach(to => {

})
