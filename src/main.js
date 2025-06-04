import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router/index';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from './stores/auth';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(createPinia())
app.use(Toast);
app.use(pinia);
app.use(ElementPlus);

const authStore = useAuthStore();

onAuthStateChanged(auth, (user) => {
    authStore.setUser(user);
  });

createApp(App).use(router).mount('#app');
