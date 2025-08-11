<template>
  <div class="admin-login">
    <div class="login-container">
      <h2 class="login-title">Masuk ke Akun</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Alamat Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Contoh: admin@email.com"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Masukkan password Anda"
            required
          />
        </div>
        <button type="submit" class="login-button">Masuk</button>
      </form>
      <p class="navigation-text">
        Belum punya akun? <router-link to="/admin/register">Daftar disini</router-link>
      </p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getLogin } from '@/data/api';
import { putAccessToken, putUserData } from '@/utils/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const response = await getLogin({ email: email.value, password: password.value });
    const token = response.data?.token || response.token;
    const userData = response.data?.user;

    if (response.ok && token && userData) {
      putAccessToken(token);
      putUserData(userData);
      toast.success('Login berhasil. Selamat datang admin!');
      router.push('/admin/new');
    } else {
      errorMessage.value = response.message || 'Login gagal. Silahkan coba lagi.';
      toast.error(errorMessage.value);
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan jaringan.';
    toast.error(errorMessage.value);
  }
};
</script>

<style scoped>
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  padding: 20px;
}

.login-container {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.logo-container {
  margin-bottom: 30px;
}

.app-title {
  color: #082E16;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.login-title {
  color: #1e293b;
  font-size: 1.5rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.login-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #475569;
  font-size: 0.95rem;
}

input, button {
  width: 100%;
  padding: 12px 16px; /* Padding yang sama */
  border-radius: 8px; /* Border radius yang sama */
  font-size: 1rem; /* Ukuran font yang sama */
  height: 48px; /* Tinggi yang sama */
  box-sizing: border-box; /* Pastikan padding tidak mempengaruhi lebar total */
}

input {
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #255F38;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  background-color: white;
}

.login-button {
  background-color: #1F7D53;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #255F38;
}

.navigation-text {
  margin-top: 20px;
  color: #64748b;
  font-size: 0.95rem;
}

.navigation-text a {
  color: #255F38;
  text-decoration: none;
  font-weight: 500;
}

.navigation-text a:hover {
  text-decoration: underline;
}

.error-message {
  color: #ef4444;
  margin-top: 20px;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .login-container {
    padding: 30px 20px;
    border-radius: 0;
    box-shadow: none;
  }

  .app-title {
    font-size: 1.6rem;
  }

  .login-title {
    font-size: 1.3rem;
  }
}
</style>