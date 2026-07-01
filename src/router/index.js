import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import Cart from '../Cart.vue'
import Detail from '../Detail.vue'
import Login from '../Login.vue'
import Order from '../Order.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
