import Vue from 'vue'
import VueRouter from 'vue-router'
import 'normalize.css/normalize.css' // CSS重置的现代替代方案

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 全局css

import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false
//axios配置
import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1'

import qs from 'qs'
Vue.prototype.$qs = qs

//摄像头悬浮框
import { ToDragDirective } from '@howdyjs/to-drag'
Vue.use(ToDragDirective)


import '@/icons' // 图标
// import '@/permission' // 权限控制

// 引入ecahrts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRouter)
