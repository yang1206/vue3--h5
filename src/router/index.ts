import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from '@/store/index'
let userStore: any = null
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        },
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/Search.vue'),
        meta: {
          title: '搜索',
          keepAlive: false
        },
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          title: '首页',
          keepAlive: false
        },
        component: () => import('@/views/user/User.vue'),
        beforeEnter: (to, from, next) => {
          if (userStore === null) {
            userStore = useUserStore()
          }
          if (userStore.getToken == '') {
            router.push('login')
          } else {
            next()
          }
        }
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/detail/Detail.vue'),
        meta: {
          title: '详情',
          keepAlive: false
        },
      },
      // {
      //   path: '/edit',
      //   name: 'Edit',
      //   component: () => import('@/views/edit/Edit.vue')
      // },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router
