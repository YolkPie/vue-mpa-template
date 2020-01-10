import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '_v/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'home.html',
  routes
})

export default router
