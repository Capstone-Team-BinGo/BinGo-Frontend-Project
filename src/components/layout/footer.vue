<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="brand-column">
          <div class="logo-container">
            <span class="logo-text">BinGo!</span>
          </div>
          <p class="footer-text">
            Platform edukasi pengelolaan sampah dengan pendekatan menyenangkan
            dan interaktif.
          </p>
          <div class="dev-team" v-if="devTeam.length > 0">
            <div class="team-members">
              <a
                v-for="member in devTeam"
                :key="member.login"
                :href="member.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="team-member"
              >
                <img
                  :src="member.avatar_url"
                  :alt="member.login"
                  class="avatar-stack"
                />
                <span>{{ member.name || member.login }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="links-column">
          <h3 class="footer-title">Navigasi</h3>
          <ul class="footer-links">
            <li>
              <router-link to="/"
                ><i class="fas fa-chevron-right"></i>Beranda</router-link
              >
            </li>
            <li>
              <router-link to="/scan"
                ><i class="fas fa-chevron-right"></i>Scan Sampah</router-link
              >
            </li>
            <li>
              <router-link v-if="authStore.isAuthenticated" to="/edukasi"
                ><i class="fas fa-chevron-right"></i>Edukasi</router-link
              >
            </li>
            <li>
              <router-link v-if="authStore.isAuthenticated" to="/kuis"
                ><i class="fas fa-chevron-right"></i>Kuis</router-link
              >
            </li>
            <li>
              <router-link to="/about"
                ><i class="fas fa-chevron-right"></i>Tentang Kami</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="contact-column">
          <h3 class="footer-title">Hubungi Kami</h3>
          <ul class="footer-contacts">
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>Surakarta, Jawa Tengah, Indonesia</span>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <a href="mailto:infobingo@gmail.com">infobingo@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <div class="copyright">&copy; 2025 BinGo!. All rights reserved.</div>
        <div class="legal-links">
          <a href="#" @click.prevent="$emit('open-privacy')"
            >Kebijakan Privasi</a
          >
          <span>•</span>
          <a href="#" @click.prevent="$emit('open-terms')">Syarat & Layanan</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
export default {
  name: 'FooterComponent',
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
  methods: {
    showHome() {
      this.$emit('navigate', 'home');
    },
    showHowToPlay() {
      this.$emit('navigate', 'memilah');
    },
    showAbout() {
      this.$emit('navigate', 'about');
    },
  },
  data() {
    return {
      devTeam: [
        {
          html_url: 'https://github.com/vagabondzz',
          avatar_url: 'https://avatars.githubusercontent.com/u/1234567?v=4',
        },
        {
          html_url: 'https://github.com/afrian-viky',
          avatar_url: 'https://avatars.githubusercontent.com/u/181040952?v=4',
        },
        {
          html_url: 'https://github.com/KingRovs771',
          avatar_url: 'https://avatars.githubusercontent.com/u/53458876?v=4',
        },
        {
          html_url: 'https://github.com/kaylargya',
          avatar_url: 'https://avatars.githubusercontent.com/u/199203465?v=4',
        },
        {
          html_url: 'https://github.com/tiiyaaraa',
          avatar_url: 'https://avatars.githubusercontent.com/u/199484189?v=4',
        },
        {
          html_url: 'https://github.com/gtjenx',
          avatar_url: 'https://avatars.githubusercontent.com/u/198513606?v=4',
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Base Styles */
.footer {
  background-color: #010302;
  color: #e2e8f0;
  position: relative;
  padding-top: 80px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

/* Brand Column */
.brand-column {
  display: flex;
  flex-direction: column;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(90deg, #10b981, #065f46);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-text {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 25px;
  font-size: 15px;
}

.dev-team {
  margin-top: 20px;
  margin-left: 20px;
}

.avatar-stack {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #010302;
  margin-left: -20px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-right: 5px;
}

.avatar-stack:hover {
  transform: translateY(-5px);
  z-index: 2;
  border-color: #10b981;
}

.avatar-stack:hover::after {
  opacity: 1;
  bottom: -40px;
}

/* Responsive adjustment */
@media (max-width: 480px) {
  .stacked-avatar {
    width: 36px;
    height: 36px;
    margin-left: -15px;
  }
}

/* Links Column */
.links-column {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.footer-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #065f46);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links li a {
  color: #94a3b8;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 15px;
}

.footer-links li a:hover {
  color: #42835a;
  transform: translateX(5px);
}

.footer-links li a i {
  font-size: 12px;
  color: #10b981;
}

/* Contact Column */
.contact-column {
  display: flex;
  flex-direction: column;
}

.footer-contacts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-contacts li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.5;
}

.footer-contacts li i {
  color: #10b981;
  margin-top: 3px;
  flex-shrink: 0;
}

.footer-contacts li a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-contacts li a:hover {
  color: #3b82f6;
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 15px;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.legal-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.legal-links a:hover {
  color: #42835a;
}

.legal-links span {
  color: #475569;
}

/* Responsive Adjustments */
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer-bottom {
    flex-direction: row;
  }

  .copyright {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .footer {
    padding-top: 60px;
  }

  .footer-wave {
    top: -40px;
    height: 40px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
