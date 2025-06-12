import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import HomeContent from '@/components/home.vue';
import OrganicList from '@/components/waste/category/organic.vue';
import AnorganicList from '@/components/waste/category/anorganic.vue';
import B3List from '@/components/waste/category/b3.vue';
import AboutPage from '@/components/about.vue';
import KuisComponent from '@/components/waste/kuis.vue';
import TabScan from '@/components/views/TabScan.vue';
import WasteEducation from '@/components/views/WasteEducation.vue';
import ArticlePage from '@/components/views/ArticlePage.vue';
import AdminLogin from '@/components/admin/AdminLogin.vue';
import AdminRegister from '@/components/admin/AdminRegister.vue';
import ManageArticle from '@/components/admin/managearticle.vue';
import NewArticle from '@/components/admin/newarticle.vue';
import NotFoundPage from '@/components/errorPage.vue';
import { getAccessToken } from '../utils/auth';

const routes = [
  { path: '/', name: 'Home', component: HomeContent },
  { path: '/organic', name: 'organic', component: OrganicList },
  { path: '/anorganic', name: 'anorganic', component: AnorganicList },
  { path: '/b3', name: 'b3', component: B3List },
  { path: '/about', name: 'about', component: AboutPage },
  {
    path: '/kuis',
    name: 'Kuis',
    component: KuisComponent,
    meta: { requiresAuth: true },
  },
  { path: '/scan', name: 'TabScan', component: TabScan },
  {
    path: '/edukasi',
    name: 'WasteEducation',
    component: WasteEducation,
    meta: { requiresAuth: true },
  },
  { path: '/article/:article_uid', name: 'article', component: ArticlePage },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { guestOnly: true },
  },
  {
    path: '/admin/register',
    name: 'AdminRegister',
    component: AdminRegister,
    meta: { guestOnly: true },
  },
  {
    path: '/admin/new',
    name: 'NewArticle',
    component: NewArticle,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/manage',
    name: 'ManageArticle',
    component: ManageArticle,
    meta: { requiresAdmin: true },
  },
  { path: '/admin', redirect: '/admin/login' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Jika posisi sebelumnya ada (misalnya user klik tombol "back"), scroll ke sana
    if (savedPosition) {
      return savedPosition;
    } else {
      // Scroll ke atas
      return { top: 0 };
    }
  },
});

const auth = getAuth();

router.beforeEach(async (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const loginTimestamp = localStorage.getItem('loginTimestamp');
  const hours24 = 24 * 60 * 60 * 1000;
  const token = getAccessToken();

  // Handle admin routes
  if (to.path.startsWith('/admin')) {
    // Jika route membutuhkan admin tapi belum login
    if (to.meta.requiresAdmin && !token) {
      return next('/admin/login');
    }

    // Jika sudah login tapi mencoba akses halaman guest only
    if (to.meta.guestOnly && token) {
      return next('/admin/manage');
    }

    // Redirect to login after successful registration
    if (
      to.path === '/admin/register' &&
      from.path === '/admin/register' &&
      !to.query.registered
    ) {
      return next('/admin/login');
    }
  }

  if (to.meta.requiresAuth && !user) {
    return next('/');
  }

  if (user && loginTimestamp) {
    const now = Date.now();
    const diff = now - Number(loginTimestamp);

    if (diff > hours24) {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('loginTimestamp');
      alert('Sesi Anda sudah habis. Anda telah logout otomatis.');
      return next('/'); // Arahkan ke halaman Home
    }
  }

  next();
});

export default router;
