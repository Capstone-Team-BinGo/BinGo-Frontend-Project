import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import HomeContent from '@/components/home.vue';
import RegisterPage from '@/components/registerPage.vue';
import OrganicList from '@/components/organic.vue';
import AnorganicList from "@/components/anorganic.vue";
import B3List from '@/components/b3.vue';
import LoginPage from '@/components/loginPage.vue';
import AboutPage from '@/components/about.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeContent },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/organic', name: 'organic', component: OrganicList },
  { path: '/anorganic', name: 'anorganic', component: AnorganicList },
  { path: '/b3', name: 'b3', component: B3List },
  { path: '/about', name: 'about', component: AboutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const auth = getAuth();

router.beforeEach(async (to, from, next) => {
  // Path yang tidak butuh login, misalnya /login dan /register
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  const user = JSON.parse(localStorage.getItem('user'));
  const loginTimestamp = localStorage.getItem('loginTimestamp');
  const hours24 = 24 * 60 * 60 * 1000;

  if (user && loginTimestamp) {
    const now = Date.now();
    const diff = now - Number(loginTimestamp);

    if (diff > hours24) {
      // Sudah lewat 24 jam: logout dan redirect ke login
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('loginTimestamp');
      alert('Sesi Anda sudah habis. Silakan login ulang.');
      return next('/login');
    }
  }

  if (authRequired && !user) {
    // Jika halaman butuh login tapi user belum login, redirect ke login
    return next('/login');
  }

  next();
});

export default router;
