import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
window.axios = require('axios')
createApp(App).use(router).mount('#app')
