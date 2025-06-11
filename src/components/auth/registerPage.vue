<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-form">
        <!-- Header -->
        <div class="logo">
          <span class="logo-text">BinGo!</span>
          <h1>Buat Akun Baru</h1>
          <p>Mulai kelola sampah dengan lebih bijak bersama BinGo!</p>
        </div>

        <!-- Google Sign Up -->
        <button class="social-btn google-btn" @click="registerWithGoogle">
          <img class="social-icon" src="@/assets/google.png" alt="Google logo" />
          Daftar dengan Google
        </button>

        <!-- Divider -->
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text">atau</span>
          <span class="divider-line"></span>
        </div>

        <!-- Form Manual -->
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="name">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              v-model="name"
              required
              placeholder="Masukan nama lengkap"
            />
          </div>

          <div class="form-group">
            <label for="email">Alamat Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Masukan alamat email"
            />
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <div class="password-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                placeholder="Masukan kata sandi"
              />
              <i
    :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
    @click="togglePassword"
    class="eye-icon"
  ></i>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Konfirmasi Kata Sandi</label>
            <div class="password-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                placeholder="Ulangi kata sandi"
              />
              <i
    :class="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
    @click="toggleConfirmPassword"
    class="eye-icon"
  ></i>
            </div>
            <p v-if="passwordMismatch" class="error-msg">
              Kata sandi tidak cocok.
            </p>
          </div>

          <button type="submit" class="login-button">Daftar</button>
        </form>

        <p class="signup-link">Sudah punya akun? <router-link to="/login">Masuk Disini</router-link></p>
      </div>

      <div class="login-image">
        <div class="image-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    passwordMismatch() {
      return this.confirmPassword && this.password !== this.confirmPassword;
    },
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    registerUser() {
      if (this.passwordMismatch) {
        alert("Kata sandi tidak cocok. Harap ulangi.");
        return;
      }

      // Simulasi daftar
      alert(`Akun berhasil dibuat untuk ${this.name}`);
      this.name = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
    async registerWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("Google user:", user);

        // Redirect ke halaman utama atau dashboard
        this.$router.push("/");
      } catch (error) {
        console.error("Google Sign-In error:", error.message);
        alert("Gagal login dengan Google.");
      }
    },
  },
};
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
  margin-bottom: 24px;
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

.password-wrapper {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #64748b;
}

.error-msg {
  color: #ef4444;
  font-size: 13px;
  margin-top: 4px;
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