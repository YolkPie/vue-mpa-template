import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '_v/{{pageName}}'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Page
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + '{{pageName}}.html',
  routes
})

export default router
