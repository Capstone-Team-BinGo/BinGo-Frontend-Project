<template>
  <div id="app">
    <HeaderComponent @navigate="handleNavigation" />

    <main class="content">
      <!-- Tambahkan prop untuk menampilkan login page dan mengatur event -->
      <router-view @open-forgot-password="showForgotPasswordModal = true" />
    </main>

    <FooterComponent @navigate="handleNavigation" />

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal
      v-if="showForgotPasswordModal"
      @close="showForgotPasswordModal = false"
    />
  </div>
</template>

<script>
import HeaderComponent from './components/layout/header.vue';
import FooterComponent from './components/layout/footer.vue';
import ForgotPasswordModal from './components/auth/forgotPasswordPage.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    ForgotPasswordModal,
  },
  data() {
    return {
      currentPage: 'home',
      showForgotPasswordModal: false,
      showRegisterModal: false,
    };
  },
  methods: {
    handleNavigation(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
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
