
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/common.scss'

import store from './vuex/store'
import Vuex from 'vuex'
import router from './routers/'
import 'font-awesome/css/font-awesome.min.css'

import http from '@/api/http'

Vue.use(ElementUI)

Vue.use(Vuex)

Vue.prototype.http=http

let main=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default main