import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router/index';
import 'leaflet/dist/leaflet.css';


createApp(App).use(router).mount('#app');
