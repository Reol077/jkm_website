import { createApp } from 'vue'
import App from './App.vue'

// 路由组件
import router from './router'

// AJAX
import axios from 'axios'

// element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

// 动画效果
import 'animate.css'

// 导入全局样式
import '../src/assets/global.css'
// 导入字体图标库
import '../src/assets/iconfont/iconfont.css'

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
