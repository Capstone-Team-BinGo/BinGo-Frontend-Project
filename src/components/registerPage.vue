<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-form">
        <!-- Header -->
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.176 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.546 3.75 3.75 0 013.255 3.718z" clip-rule="evenodd" />
          </svg>
          <h1>Buat Akun Baru</h1>
          <p>Mulai kelola sampah dengan lebih bijak bersama Bingo</p>
        </div>

        <!-- Google Sign Up -->
        <button class="social-btn google-btn" @click="registerWithGoogle">
          <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
          </svg>
          Lanjutkan dengan Google
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
              <svg 
                @click="togglePassword"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                class="eye-icon"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-.653 1.918-2.31 3.399-5.455 3.399-9.163 0-3.707-1.462-6.82-3.4-8.162a1.2 1.2 0 00-1.12 0C18.36 2.442 15.507 1.5 12 1.5s-6.36.942-8.599 2.538a1.2 1.2 0 000 1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                <path v-if="showPassword" fill-rule="evenodd" d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18z" clip-rule="evenodd" />
              </svg>
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
              <svg 
                @click="toggleConfirmPassword"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                class="eye-icon"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-.653 1.918-2.31 3.399-5.455 3.399-9.163 0-3.707-1.462-6.82-3.4-8.162a1.2 1.2 0 00-1.12 0C18.36 2.442 15.507 1.5 12 1.5s-6.36.942-8.599 2.538a1.2 1.2 0 000 1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                <path v-if="showConfirmPassword" fill-rule="evenodd" d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18z" clip-rule="evenodd" />
              </svg>
            </div>
            <p v-if="passwordMismatch" class="error-msg">
              Kata sandi tidak cocok.
            </p>
          </div>

          <button type="submit" class="login-button">Daftar</button>
        </form>

        <p class="signup-link">Sudah punya akun? <router-link to="/login">Masuk di sini</router-link></p>
      </div>
      
      <div class="login-image">
        <div class="image-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
    registerWithGoogle() {
      alert("Fitur Google belum dihubungkan ke backend.");
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

.logo svg {
  width: 48px;
  height: 48px;
  color: #3b82f6;
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
  color: #1e293b;
}

.social-icon {
  width: 18px;
  height: 18px;
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
  background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
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
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%);
}

@media (min-width: 768px) {
  .login-image {
    display: block;
  }
}
</style>