import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'

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
  },
  {
    path: '/login',
    name: 'login',
    component:Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: '/areahome',
    name: 'areahome',
    component: () => import(/* webpackChunkName: "Cooparation" */ '../views/AreaHome.vue'),
    meta: {
      title: "学校下单",
    },
  },
  {
    path: '/areacheckorder',
    name: 'areacheckorder',
    meta: {
      title: "学校订单核对",
    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "order" */ '../views/AreaCheckOrder.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
