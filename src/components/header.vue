<template>
  <header class="site-header">
    <div class="container">
      <div class="logo">
        <img src="@/assets/bingo1.png" alt="Bingo Logo" class="logo-image" style="height: 40px;" />
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="Toggle menu">
        <div class="hamburger" :class="{ 'active': isMobileMenuOpen }">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </button>

      <!-- Navigation Links (Desktop) -->
      <nav class="nav-links">
        <router-link to="/" class="nav-link">Beranda</router-link>
        <router-link to="/scan" class="nav-link">Scan Sampah</router-link>
        <router-link to="/contact" class="nav-link">Edukasi</router-link>
        <router-link to="/kuis" class="nav-link">Kuis</router-link>
        <router-link to="/about" class="nav-link">Tentang Kami</router-link>
      </nav>

      <div class="auth-buttons">
        <router-link to="/login" class="btn sign-in">
          <i class="fas fa-sign-in-alt"></i> Sign In
        </router-link>
        <router-link to="/register" class="btn sign-up">
          <i class="fas fa-user-plus"></i> Sign Up
        </router-link>
      </div>
    </div>

    <!-- Mobile Menu (Hidden on Desktop) -->
    <transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <router-link to="/" class="mobile-link" @click="toggleMobileMenu">Beranda</router-link>
        <router-link to="/scan" class="mobile-link" @click="toggleMobileMenu">Scan Sampah</router-link>
        <router-link to="/contact" class="mobile-link" @click="toggleMobileMenu">Edukasi</router-link>
        <router-link to="/kuis" class="mobile-link" @click="toggleMobileMenu">Kuis</router-link>
        <router-link to="/about" class="mobile-link" @click="toggleMobileMenu">Tentang Kami</router-link>


        <div class="mobile-auth">
          <router-link to="/login" class="btn mobile-sign-in" @click="toggleMobileMenu">
            <i class="fas fa-sign-in-alt"></i> Sign In
          </router-link>
          <router-link to="/register" class="btn mobile-sign-up" @click="toggleMobileMenu">
            <i class="fas fa-user-plus"></i> Sign Up
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      isMobileMenuOpen: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    }
  },
  watch: {
    $route() {
      this.closeMobileMenu();
    }
  }
};
</script>

<style scoped>
.site-header {
  background-color: white;
  padding: 1.5rem;
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
  background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
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
  color: #1F7D53;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #42835A 0%, #25A989 100%);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-exact-active {
  color: #082E16;
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
  background: #1F7D53;
  color: #ffffff;
  transform: translateY(-1px);
}

.sign-up {
  background: #1F7D53;
  color: white;
  border: none;
}

.sign-up:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(96, 246, 59, 0.2);
}

/* Mobile Menu Styles */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
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
  color: #1e40af;
}

.mobile-auth {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
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

/* Responsive Behavior */
@media (max-width: 768px) {
  .site-header {
    padding: 1rem;
  }

  .nav-links,
  .auth-buttons {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .container {
    padding: 0;
  }
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none !important;
  }
}
</style>