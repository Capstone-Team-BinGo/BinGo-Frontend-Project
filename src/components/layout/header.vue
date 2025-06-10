<template>
  <header class="site-header">
    <div class="container">
      <div class="logo">
        <span class="logo-text">BinGo!</span>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-button"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <div class="hamburger" :class="{ active: isMobileMenuOpen }">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </button>

      <!-- Navigation Links (Desktop) -->
      <nav class="nav-links">
        <template v-if="!isAdminPage">
          <router-link to="/" class="nav-link">Beranda</router-link>
          <router-link to="/scan" class="nav-link">Scan Sampah</router-link>
          <router-link
            v-if="authStore.isAuthenticated"
            to="/edukasi"
            class="nav-link"
            >Edukasi</router-link
          >
          <router-link
            v-if="authStore.isAuthenticated"
            to="/kuis"
            class="nav-link"
            >Kuis</router-link
          >
          <router-link to="/about" class="nav-link">Tentang Kami</router-link>
        </template>

        <template v-else>
          <router-link
            v-if="isAdminLoggedIn"
            to="/admin/manage"
            class="nav-link"
            >Kelola Artikel</router-link
          >
          <router-link v-if="isAdminLoggedIn" to="/admin/new" class="nav-link"
            >Buat Artikel</router-link
          >
          <router-link
            v-if="!isAdminLoggedIn"
            to="/admin/login"
            class="nav-link"
            >Login Admin</router-link
          >
          <router-link
            v-if="!isAdminLoggedIn"
            to="/admin/register"
            class="nav-link"
            >Register Admin</router-link
          >
        </template>
      </nav>

      <!-- User/Admin Controls -->
      <div class="auth-controls">
        <!-- User Controls -->
        <template v-if="!isAdminPage">

          <div v-if="authStore.isAuthenticated" class="profile-wrapper">
            <div class="profile-display">
              <i class="fas fa-user-circle"></i>
              <span class="username">{{
                authStore.user?.displayName || authStore.user?.email
              }}</span>
            </div>
            <div class="logout-dropdown">
              <button @click="logout" class="logout-button">Keluar</button>
            </div>
          </div>
        </template>

        <!-- Admin Controls -->
        <template v-else>
          <div v-if="isAdminLoggedIn" class="admin-controls">
            <div class="profile-display">
              <i class="fas fa-user-circle"></i>
              <span class="username">{{ adminName }}</span>
            </div>
            <button @click="logoutAdmin" class="logout-button">Logout</button>
          </div>
        </template>
      </div>
    </div>

    <!-- Mobile Menu (Hidden on Desktop) -->
    <transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <!-- Common Mobile Links -->
        <template v-if="!isAdminPage">
          <router-link to="/" class="mobile-link" @click="toggleMobileMenu"
            >Beranda</router-link
          >
          <router-link to="/scan" class="mobile-link" @click="toggleMobileMenu"
            >Scan Sampah</router-link
          >
          <router-link
            v-if="authStore.isAuthenticated"
            to="/edukasi"
            class="mobile-link"
            @click="toggleMobileMenu"
            >Edukasi</router-link
          >
          <router-link
            v-if="authStore.isAuthenticated"
            to="/kuis"
            class="mobile-link"
            @click="toggleMobileMenu"
            >Kuis</router-link
          >
          <router-link to="/about" class="mobile-link" @click="toggleMobileMenu"
            >Tentang Kami</router-link
          >
        </template>

        <template v-else>
          <router-link
            v-if="isAdminLoggedIn"
            to="/admin/manage"
            class="mobile-link"
            @click="toggleMobileMenu"
            >Kelola Artikel</router-link
          >
          <router-link
            v-if="isAdminLoggedIn"
            to="/admin/new"
            class="mobile-link"
            @click="toggleMobileMenu"
            >Buat Artikel</router-link
          >
          <router-link
            v-if="!isAdminLoggedIn"
            to="/admin/login"
            class="mobile-link"
            @click="toggleMobileMenu"
            >Login Admin</router-link
          >
          <router-link
            v-if="!isAdminLoggedIn"
            to="/admin/register"
            class="mobile-link"
            @click="toggleMobileMenu"
            >Register Admin</router-link
          >
        </template>

        <!-- Common Mobile Auth Section -->
        <div class="mobile-auth">

          <template v-if="!isAdminPage && authStore.isAuthenticated">
            <div class="profile-mobile">
              <i class="fas fa-user-circle fa-lg"></i>
              <span class="username">{{
                authStore.user?.displayName || authStore.user?.email
              }}</span>
            </div>
            <button class="mobile-logout-btn" @click="logout">
              <i class="fas fa-sign-out-alt"></i> Keluar
            </button>
          </template>

          <template v-if="isAdminPage && isAdminLoggedIn">
            <div class="profile-mobile">
              <i class="fas fa-user-circle fa-lg"></i>
              <span class="username">{{ adminName }}</span>
            </div>
            <button class="mobile-logout-btn" @click="logoutAdmin">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { getAccessToken, removeAccessToken, getUserData } from '@/utils/auth';

export default {
  name: 'HeaderComponent',
  setup() {
    const authStore = useAuthStore();

    async function loginGoogle() {
      try {
        await authStore.loginWithGoogle();
      } catch (error) {
        alert('Gagal login dengan Google');
      }
    }

    async function logout() {
      await authStore.logout();
    }

    return { authStore, loginGoogle, logout };
  },
  data() {
    return {
      isMobileMenuOpen: false,
      isAdminPage: false,
      isAdminLoggedIn: false,
      adminName: '',
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    checkAdminRoute() {
      this.isAdminPage = this.$route.path.startsWith('/admin');
      this.isAdminLoggedIn = !!getAccessToken();

      if (this.isAdminLoggedIn) {
        const userData = getUserData();
        this.adminName = userData?.nama_lengkap || 'Admin';
      }
    },
    logoutAdmin() {
      removeAccessToken();
      localStorage.removeItem('userData'); // Hapus juga data user
      this.isAdminLoggedIn = false;
      this.$router.push('/admin/login');
    },
  },
  watch: {
    $route() {
      this.closeMobileMenu();
      this.checkAdminRoute();
    },
  },
  created() {
    this.checkAdminRoute();
  },
};
</script>

<style scoped>
/* Admin Header Styles */
.admin-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-controls .profile-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-controls .fa-user-circle {
  font-size: 1.2rem;
  color: #4b5563;
}

.admin-controls .username {
  font-size: 0.9rem;
}

/* Style tombol logout */
.logout-button {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #dc3545;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: #dc3545;
  color: white;
}

/* Existing styles... */
.site-header {
  background-color: white;
  padding: 2rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo-text {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #10b981, #065f46);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  margin: 0 auto;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #42835a;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #065f46);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-exact-active {
  color: #42835a;
  font-weight: 600;
}

.router-link-exact-active::after {
  width: 100%;
}

.auth-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.sign-in {
  background-color: transparent;
  color: #000000;
  border: 1px solid #e5e7eb;
}

.sign-in:hover {
  background: #42835a;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.sign-up {
  background: #42835a;
  color: white;
  border: none;
}

.sign-up:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

/* Mobile Menu Styles */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  margin-left: auto;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  transition: all 0.3s ease;
}

.bar {
  height: 2px;
  width: 100%;
  background-color: #1f2937;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger.active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-link {
  color: #4b5563;
  text-decoration: none;
  padding: 0.75rem 0;
  font-weight: 500;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s ease;
}

.mobile-link:hover {
  color: #42835a;
}

.mobile-auth {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
}

.profile-mobile {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 70%;
}

.profile-mobile .fa-user-circle {
  color: #5b6abf;
  font-size: 1.8rem;
  min-width: 32px;
}

.profile-mobile .username {
  font-weight: 500;
  font-size: 0.95rem;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: transparent;
  color: #dc3545;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-logout-btn:hover {
  background-color: #dc3545;
  color: white;
}

.mobile-logout-btn .fa-sign-out-alt {
  font-size: 0.9rem;
}

/* Efek aktif saat tombol ditekan */
.mobile-logout-btn:active {
  transform: scale(0.96);
  background-color: #c82333;
}

/* Responsif untuk layar sangat kecil */
@media (max-width: 360px) {
  .profile-mobile .username {
    max-width: 120px;
  }

  .mobile-logout-btn {
    padding: 8px;
  }

  .mobile-logout-btn span {
    display: none;
  }

  .mobile-logout-btn .fa-sign-out-alt {
    font-size: 1rem;
    margin-right: 0;
  }
}
.mobile-sign-in,
.mobile-sign-up {
  flex: 1;
  text-align: center;
  justify-content: center;
}

/* Animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.profile-wrapper {
  position: relative;
  display: inline-block;
  font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
}

.profile-display {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: #f8f9fa;
  color: #212529;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.profile-display:hover {
  background-color: #e9ecef;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.profile-display .fa-user-circle {
  color: #4e73df;
  font-size: 1.5rem;
  transition: transform 0.2s ease;
}

.profile-display .username {
  font-weight: 500;
  font-size: 0.9rem;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Dropdown logout */
.logout-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  min-width: 120px;
  padding-top: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.profile-wrapper:hover .logout-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.logout-button {
  width: 100%;
  padding: 8px 16px;
  background-color: #fff;
  color: #dc3545;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.logout-button:hover {
  background-color: #dc3545;
  color: white;
  box-shadow: 0 3px 10px rgba(220, 53, 69, 0.3);
}

.logout-button::before {
  content: '\f2f5';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  font-size: 0.8rem;
}

/* Animasi saat hover */
.profile-wrapper:hover .profile-display .fa-user-circle {
  transform: scale(1.1);
}

/* Efek klik */
.profile-display:active {
  transform: scale(0.98);
}

/* Responsive Behavior */
@media (max-width: 768px) {
  .site-header {
    padding: 1rem;
  }

  .nav-links,
  .auth-buttons,
  .profile-display,
  .logout-dropdown {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .container {
    padding: 0;
  }

  .admin-controls {
    display: none;
  }
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none !important;
  }
}
</style>
