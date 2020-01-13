import Vue from 'vue'
import App from './{{pageName}}.vue'
import router from '@/router/{{pageName}}'
import store from '@/store/{{pageName}}'
import '@/styles/base.scss'
import { rem } from '@yolkpie/utils'
// 注册全局插件
import '@/plugins'

rem()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
