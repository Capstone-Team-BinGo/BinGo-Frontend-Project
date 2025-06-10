<template>
  <div id="app">
    <HeaderComponent
      @navigate="handleNavigation"
      @open-login="showResetPasswordModal = true"
    />

    <main class="content">
      <!-- Tambahkan transisi di sini -->
      <transition name="fade" mode="out-in">
        <router-view
          :key="$route.fullPath"
          @open-forgot-password="showForgotPasswordModal = true"
          @open-reset-password="showResetPasswordModal = true"
          @open-login="showGoogleLoginModal = true"
        />
      </transition>
    </main>

    <FooterComponent
      v-if="!isAdminRoute"
      @navigate="handleNavigation"
      @open-terms="showServiceTerms = true"
      @open-privacy="showPrivacyPolicy = true"
    />

    <GoogleLoginModal
      v-if="showGoogleLoginModal"
      @close="showGoogleLoginModal = false"
      @open-terms="showServiceTerms = true"
      @open-privacy="showPrivacyPolicy = true"
    />

    <TermsOfServicePage
      v-if="showServiceTerms"
      @close="showServiceTerms = false"
    />

    <PrivacyPolicy
      v-if="showPrivacyPolicy"
      @close="showPrivacyPolicy = false"
    />
  </div>
</template>

<script>
import HeaderComponent from './components/layout/header.vue';
import FooterComponent from './components/layout/footer.vue';
import GoogleLoginModal from './components/auth/googleLogin.vue';
import TermsOfServicePage from './components/serviceTerms.vue';
import PrivacyPolicy from './components/privacy.vue';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    GoogleLoginModal,
    TermsOfServicePage,
    PrivacyPolicy,
  },
  setup() {
    const route = useRoute();
    const isAdminRoute = ref(false);

    const checkAdminRoute = () => {
      isAdminRoute.value = route.path.startsWith('/admin');
    };

    checkAdminRoute();

    watch(
      () => route.path,
      () => {
        checkAdminRoute();
      }
    );

    return {
      isAdminRoute,
      checkAdminRoute,
      route,
    };
  },
  data() {
    return {
      currentPage: 'home',
      showGoogleLoginModal: false,
      showServiceTerms: false,
      showPrivacyPolicy: false,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User sudah login:', user.email);
      } else {
        console.log('Belum login');
      }
    });
  },
  methods: {
    handleNavigation(page) {
      this.currentPage = page;
    },
    handleOpenGoogleLogin() {
      this.showGoogleLoginModal = true;
    },
    handleOpenTerms() {
      this.showServiceTerms = true;
    },
    handleOpenPrivacy() {
      this.showPrivacyPolicy = true;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
  scroll-behavior: smooth;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.trash-card {
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.trash-card:hover {
  transform: translateY(-5px) rotate(2deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.trash-card.selected {
  background-color: #d1fae5;
  border: 2px solid #10b981;
}

.bingo-cell {
  aspect-ratio: 1/1;
}

.bingo-line {
  position: absolute;
  background-color: #10b981;
  z-index: 10;
}

.horizontal-line {
  height: 4px;
  width: 100%;
}

.vertical-line {
  width: 4px;
  height: 100%;
}

.diagonal-line-1,
.diagonal-line-2 {
  width: 4px;
  height: 140%;
  transform-origin: center;
}

.diagonal-line-1 {
  transform: rotate(45deg);
}

.diagonal-line-2 {
  transform: rotate(-45deg);
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f00;
  border-radius: 50%;
  animation: fall 3s linear forwards;
}

@keyframes fall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>
