import { createRouter, createWebHistory } from 'vue-router';
import HomeContent from '@/components/home.vue';
import RegisterPage from '@/components/registerPage.vue'
import OrganicList from '@/components/organic.vue'
import AnorganicList from "@/components/anorganic.vue"
import B3List from '@/components/b3.vue'
import LoginPage from '@/components/loginPage.vue'
import KuisComponent from '@/components/kuis.vue'
import TabScan from '@/components/tabscan.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeContent
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/organic',
    name: 'organic',
    component: OrganicList
  },
  {
    path: '/anorganic',
    name: 'anorganic',
    component: AnorganicList
  },
  {
    path: '/b3',
    name: 'b3',
    component: B3List
  },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
