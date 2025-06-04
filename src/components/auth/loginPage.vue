<template>
    <div class="login-container">
      <div class="login-card">
        <div class="login-form">
          <div class="logo">
            <span class="logo-text">Bingo</span>
            <h1>Masuk Ke Akun Anda</h1>
          <p>Mulai kelola sampah dengan lebih bijak bersama Bingo</p>
          </div>
          
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Alamat Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="Masukkan Email" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="password">Kata Sandi</label>
  <div class="password-wrapper">
    <input
      :type="showPassword ? 'text' : 'password'"
      id="password"
      v-model="password"
      placeholder="Masukkan Kata Sandi"
      required
    >
    <i
      :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
      class="toggle-password-icon"
      @click="togglePassword"
    ></i>
    </div>
            </div>
            
            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" v-model="rememberMe">
                <span>Ingatkan Saya</span>
              </label>
               <p class="forgot-password" @click="openForgotPasswordModal">
      Lupa Kata Sandi?
    </p>
            </div>
            
            <button :disabled="isLoading" type="submit" class="login-button">
  {{ isLoading ? "Loading..." : "Masuk" }}
</button>
          </form>
  
          <div class="divider">
            <span class="divider-line"></span>
            <span class="divider-text">Atau</span>
            <span class="divider-line"></span>
          </div>
          
          <div class="social-login">
            <button class="social-btn google-btn" @click="loginWithGoogle">
                <img class="social-icon" src="@/assets/google.png" alt="Google logo" />
              Masuk Dengan Google
            </button>
          </div>
          <p class="signup-link">Belum Punya Akun? <router-link to="/register" class="signup-link">Ayo Daftar
        </router-link></p>
        </div>
        
        <div class="login-image">
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { auth, googleProvider } from "@/firebase";
  import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
  import { useToast } from "vue-toastification";
  
  export default {
    name: 'LoginPage',
    props: ['showForgotPasswordModal'],
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        showPassword: false 
      }
    },
    setup() {
      const toast = useToast();
      return { toast };
    },
    methods: {
      async handleLogin() {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
          console.log("Login success:", user);
  
          if (this.rememberMe) {
            localStorage.setItem("user", JSON.stringify(user));
          }
  
          this.$router.push("/dashboard");
        } catch (error) {
          const errorCode = error.code;
  
          if (errorCode === "auth/user-not-found") {
            this.toast.error("Email ini belum terdaftar. Silakan daftar terlebih dahulu.");
          } else if (errorCode === "auth/wrong-password") {
            this.toast.error("Password salah. Silakan coba lagi.");
          } else if (errorCode === "auth/invalid-email") {
            this.toast.warning("Format email tidak valid.");
          } else {
            this.toast.error("Terjadi kesalahan saat login. Silakan coba lagi.");
          }
  
          console.error("Login error:", error.message);
        }
      },
  
      async loginWithGoogle() {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          console.log("Google login success:", user);
          googleProvider.setCustomParameters({ prompt: 'select_account' });
  
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/");
        } catch (error) {
          console.error("Google login failed:", error.message);
          this.toast.error("Gagal login dengan Google.");
        }
      },
      async requestPrivacyPermissions() {
  try {
   
    await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Lokasi disetujui:", position);
          resolve(position);
        },
        (error) => {
          this.toast.warning("Izin lokasi ditolak.");
          reject(error);
        }
      );
    });

    await navigator.mediaDevices.getUserMedia({ video: true });
    console.log("Izin kamera disetujui.");
  } catch (error) {
    this.toast.warning("Izin privasi tidak diberikan.");
    console.warn("Permission error:", error);
  }
},    
  
      openForgotPasswordModal() {
        this.$emit('open-forgot-password');
      },
  
      togglePassword() {
        this.showPassword = !this.showPassword;
      }
    }
  }
  </script>
  
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f8fafc;
  }
  
  .login-card {
    display: flex;
    max-width: 1000px;
    width: 100%;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .login-form {
    flex: 1;
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .logo {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo-text {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #10B981, #065F46);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  transition: all 0.3s ease;
}
  
.logo h1 {
  margin-top: 16px;
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
}

.logo p {
  margin-top: 8px;
  font-size: 14px;
  color: #64748b;
}
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    font-size: 14px;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    color: #475569;
  }
  
  .remember-me input {
    margin-right: 8px;
  }
  
  .forgot-password {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }
  
  .forgot-password:hover {
    text-decoration: underline;
  }

  .password-wrapper {
  position: relative;
}

.toggle-password-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #64748b;
  font-size: 16px;
}
  
  .login-button {
    width: 100%;
    padding: 12px;
    background: #42835A;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .login-button:hover {
    opacity: 0.9;
  }
  
  .divider {
    display: flex;
    align-items: center;
    margin: 24px 0;
  }
  
  .divider-line {
    flex: 1;
    height: 1px;
    background-color: #e2e8f0;
  }
  
  .divider-text {
    padding: 0 12px;
    color: #64748b;
    font-size: 14px;
  }
  
  .social-login {
    margin-top: 16px;
  }
  
  .social-btn {
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.2s;
  }
  
  .social-btn:hover {
    background-color: #f8fafc;
  }
  
  .google-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #3c4043;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #dadce0;
  border-radius: 4px;
  height: 40px;
  padding: 0 24px;
  width: 100%;
  box-shadow: none;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
}

.google-btn:hover {
  background-color: #f7f8f8;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3);
}

.google-btn:active {
  background-color: #eee;
}

.google-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.3);
}

.social-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}


  
  .signup-link {
    margin-top: 32px;
    text-align: center;
    font-size: 14px;
    color: #64748b;
  }
  
  .signup-link a {
    color: #3b82f6;
    font-weight: 500;
    text-decoration: none;
  }
  
  .signup-link a:hover {
    text-decoration: underline;
  }
  
  .login-image {
  flex: 1;
  background: url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop') center/cover;
  position: relative;
  display: none;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.8) 0%, rgba(6, 95, 70, 0.8) 100%);
}
  
  
  @media (min-width: 768px) {
    .login-image {
      display: block;
    }
  }
  </style>