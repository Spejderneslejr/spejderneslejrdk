import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import VScrollLock from "v-scroll-lock";

createApp(App).use(VScrollLock).mount('#app')
