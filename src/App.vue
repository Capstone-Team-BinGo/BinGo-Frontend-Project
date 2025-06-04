<template>
  <div id="app">
    <HeaderComponent
      @navigate="handleNavigation"
      @open-login="showResetPasswordModal = true"
    />


    <main class="content">
      <!-- Gunakan <router-view> dengan benar -->
      <router-view
        @open-forgot-password="showForgotPasswordModal = true"
        @open-reset-password="showResetPasswordModal = true"
      />
    </main>

    <FooterComponent @navigate="handleNavigation" />

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal
  v-if="showForgotPasswordModal"
  @close="showForgotPasswordModal = false"
  @open-reset-password="handleOpenResetPassword"
/>

    <!-- Reset Password Modal -->
    <ResetPasswordModal
      v-if="showResetPasswordModal"
      @close="showResetPasswordModal = false"
    />
  </div>
</template>

<script>
import HeaderComponent from './components/layout/header.vue'
import FooterComponent from './components/layout/footer.vue'
import ForgotPasswordModal from './components/auth/forgotPasswordPage.vue'
import ResetPasswordModal from './components/auth/passwordResetPage.vue'
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    ForgotPasswordModal,
    ResetPasswordModal
  },
  data() {
    return {
      currentPage: 'home',
      showForgotPasswordModal: false,
      showResetPasswordModal: false
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User sudah login:", user.email);
      } else {
        console.log("Belum login");
      }
    });
  },
  methods: {
    handleNavigation(page) {
      this.currentPage = page;
    },
    handleOpenResetPassword() {
    this.showResetPasswordModal = true;
  }
  }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

        html, body {
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

        .diagonal-line-1, .diagonal-line-2 {
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
