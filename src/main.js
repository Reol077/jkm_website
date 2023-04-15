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
import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message-box.css'


// 动画效果
import 'animate.css'

// 导入全局样式
import '../src/assets/global.css'
// 导入字体图标库
import '../src/assets/iconfont/iconfont.css'
// ant-design样式
import 'ant-design-vue/dist/antd.css';


// base64加密
import { Base64 } from 'js-base64'

const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true
})

app.config.globalProperties.$http = axiosInstance
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.config.globalProperties.$Base64 = Base64;


// app.use(ElementPlus)
app.use(router)
app.mount('#app')
