import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = ""
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  config.params = { ...config.params, icode: '' }
  if (config.data instanceof FormData) {
    config.data.append('icode', '')
  } else {
    config.data = { ...config.data, icode: '' }
  }
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
