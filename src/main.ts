import { createApp } from 'vue'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import '@unocss/reset/tailwind-compat.css'
import microApp from '@micro-zoe/micro-app'
import '@/styles/main.scss'
import setupStore from './stores'
import setupRouter from './router'
import App from './App.vue'

microApp.start()
const app = createApp(App)
setupRouter(app)
setupStore(app)
app.mount('#app')
