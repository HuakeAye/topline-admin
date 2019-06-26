import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 请求拦截器
axios.interceptors.request.use((config) => {
  const userinfo = JSON.parse(window.localStorage.getItem('user_info'))
  if (userinfo) {
    config.headers.Authorization = `Bearer ${userinfo.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((response) => {
  return response.data.data
}, (error) => {
  return Promise.reject(error)
})

Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
