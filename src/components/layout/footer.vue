<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="brand-column">
          <div class="logo-container">
            <span class="logo-text">Bingo</span>
          </div>
          <p class="footer-text">
            Platform edukasi pengelolaan sampah dengan pendekatan menyenangkan dan interaktif.
          </p>
          <div class="social-links">
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Youtube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="links-column">
          <h3 class="footer-title">Navigasi</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="showHome"><i class="fas fa-chevron-right"></i> Beranda</a></li>
            <li><a href="#" @click.prevent="showHowToPlay"><i class="fas fa-chevron-right"></i> Cara Memilah</a></li>
            <li><a href="#" @click.prevent="showAbout"><i class="fas fa-chevron-right"></i> Tentang Kami</a></li>
            <li><a href="#" @click.prevent="showAbout"><i class="fas fa-chevron-right"></i> Edukasi</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="contact-column">
          <h3 class="footer-title">Hubungi Kami</h3>
          <ul class="footer-contacts">
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>Jl. Lingkungan Hijau No. 123, Jakarta</span>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <a href="mailto:info@bingosampah.id">info@bingosampah.id</a>
            </li>
            <li>
              <i class="fas fa-phone-alt"></i>
              <a href="tel:+621234567890">+62 123 4567 890</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <div class="copyright">
          &copy; 2023 Bingo Sampah. All rights reserved.
        </div>
        <div class="legal-links">
          <a href="#">Kebijakan Privasi</a>
          <span>•</span>
          <a href="#">Syarat & Ketentuan</a>
          <span>•</span>
          <a href="#">Peta Situs</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  methods: {
    showHome() {
      this.$emit('navigate', 'home');
    },
    showHowToPlay() {
      this.$emit('navigate', 'memilah');
    },
    showAbout() {
      this.$emit('navigate', 'about');
    }
  }
};
</script>

<style scoped>
/* Base Styles */
.footer {
  background-color: #082E16;
  color: #e2e8f0;
  position: relative;
  padding-top: 80px;
  margin-top: 80px;
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
  background: linear-gradient(90deg, #42835A 0%, #25A989 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-text {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 25px;
  font-size: 15px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-3px);
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
  background: linear-gradient(90deg, #42835A 0%, #25A989 100%);;
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
  color: #3b82f6;
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
  color: #3b82f6;
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