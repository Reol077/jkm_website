import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'animate.css'
import '../src/assets/global.css'

const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true
})

app.config.globalProperties.$http = axiosInstance

app.use(ElementPlus)
app.use(router)
app.mount('#app')
