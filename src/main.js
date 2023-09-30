import { createApp } from 'vue'
import AppLayout from './layouts/index.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

import { createManager } from '@vue-youtube/core';


const app = createApp(AppLayout)

app.use(router)
app.use(ElementPlus)
app.use(createManager())

app.mount('#app')
