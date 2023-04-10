import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

import 'animate.css'
import '../src/assets/global.css'

const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true
})

app.config.globalProperties.$http = axiosInstance
app.config.globalProperties.$message = ElMessage

// app.use(ElementPlus)
app.use(router)
app.mount('#app')
