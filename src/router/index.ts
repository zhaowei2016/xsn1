import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "购奶服务",
    },
  },
  {
    path: '/cooparation',
    name: 'cooparation',
    meta: {
      title: "校企合作",
    },
    component: () => import(/* webpackChunkName: "Cooparation" */ '../views/Cooparation.vue'),
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: "我的订单",
    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "order" */ '../views/OrderView.vue')
  },
  {
    path: '/checkorder',
    name: 'checkorder',
    meta: {
      title: "订单核对",
    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "order" */ '../views/CheckOrder.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
