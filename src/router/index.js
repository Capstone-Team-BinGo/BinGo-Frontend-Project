import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import HomeContent from '@/components/home.vue';
import RegisterPage from '@/components/auth/registerPage.vue';
import OrganicList from '@/components/waste/category/organic.vue';
import AnorganicList from "@/components/waste/category/anorganic.vue";
import B3List from '@/components/waste/category/b3.vue';
import LoginPage from '@/components/auth/loginPage.vue';
import AboutPage from '@/components/about.vue';
import KuisComponent from '@/components/waste/kuis.vue'
import TabScan from '@/components/views/TabScan.vue'
import WasteEducation from '@/components/views/WasteEducation.vue';
import ArticlePage from '@/components/views/ArticlePage.vue';
//import ManageArticle from '@/components/admin/managearticle.vue';
//import NewArticle from '@/components/admin/newarticle.vue';


const routes = [
  { path: '/', name: 'Home', component: HomeContent },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/organic', name: 'organic', component: OrganicList },
  { path: '/anorganic', name: 'anorganic', component: AnorganicList },
  { path: '/b3', name: 'b3', component: B3List },
  { path: '/about', name: 'about', component: AboutPage },
    {
  path: '/kuis',
  name: 'Kuis',
  component: KuisComponent
  },
  {
  path: '/scan',
  name: 'TabScan',
  component: TabScan
  },
  {
  path: '/edukasi',
  name: 'WasteEducation',
  component: WasteEducation
  },
  {
  path: '/article/:id',
  name: 'article',
  component: ArticlePage,
  },
/*    {
  path: '/manage',
  name: 'managearticle',
  component: ManageArticle,
  },
    {
  path: '/new',
  name: 'newarticle',
  component: NewArticle,
  },*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const auth = getAuth();

router.beforeEach(async (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const loginTimestamp = localStorage.getItem('loginTimestamp');
  const hours24 = 24 * 60 * 60 * 1000;

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
