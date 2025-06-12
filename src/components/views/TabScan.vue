<template>
  <div class="scan-app">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">
          <i class="fas fa-recycle"></i> Pemindai Sampah
        </h1>
        <p class="app-subtitle">Identifikasi jenis sampah dengan teknologi AI</p>
      </header>

      <main class="app-content">
        <div class="feature-highlight">
          <div class="highlight-content">
            <h3>Pindai Sampah Anda dalam 3 Langkah Mudah</h3>
            <div class="steps">
              <div class="step" data-aos="zoom-in-up" data-aos-duration="1000">
                <div class="step-icon">1</div>
                <p>Unggah atau ambil foto</p>
              </div>
              <div class="step" data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="300">
                <div class="step-icon">2</div>
                <p>Biarkan AI kami menganalisis</p>
              </div>
              <div class="step" data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="600">
                <div class="step-icon">3</div>
                <p>Dapatkan petunjuk pembuangan</p>
              </div>
            </div>
          </div>
        </div>

        <UploadSection
          @file-uploaded="handleFileUploaded"
          @image-analyzed="handleImageAnalyzed"
          @loading-started="handleLoadingStarted"
          @loading-finished="handleLoadingFinished"
          @analysis-failed="handleAnalysisFailed"
                @limit-reached="handleLimitReached"
      @open-login="handleOpenLogin"
          class="upload-section"
        />

        <transition name="fade-slide">
          <ResultsSection
            v-if="analysisResult"
            :analysisResult="analysisResult"
            class="results-section"
          />
        </transition>

        <transition name="fade">
      <div v-if="showLoginModal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Login Diperlukan</h3>
            <button class="close-btn" @click="showLoginModal = false">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <p>Login untuk melanjutkan scan tanpa batas!</p>
            <!-- Isi dengan form login atau komponen login -->
            <button class="login-btn" @click="redirectToLogin">
              Pergi ke Halaman Beranda untuk Login
            </button>
          </div>
        </div>
      </div>
    </transition>
      </main>
    </div>
  </div>
</template>

<script>
import UploadSection from '../waste/scan/UploadSection.vue';
import ResultsSection from '../waste/scan/ResultsSection.vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'TabScan',
  components: {
    UploadSection,
    ResultsSection,
  },
  data() {
    return {
      imagePreview: null,
      uploadedFile: null,
      analysisResult: null,
      isLoading: false,
            showLoginModal: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    handleFileUploaded({ imagePreview, uploadedFile }) {
      this.imagePreview = imagePreview;
      this.uploadedFile = uploadedFile;
    },
    handleImageAnalyzed(result) {
      this.analysisResult = result;
      this.toast.success('Analisis berhasil!', {
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-right',
      });
    },
    handleLoadingStarted() {
      this.isLoading = true;
    },
    handleLoadingFinished() {
      this.isLoading = false;
    },
    handleAnalysisFailed(error) {
      console.error('Kesalahan analisis:', error);
      this.toast.error('Gagal menganalisis gambar. Silakan coba lagi.', {
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-right',
      });
    },
    getIconByKategori(kategori) {
      switch (kategori.toLowerCase()) {
        case 'organik':
          return 'fas fa-leaf';
        case 'anorganik':
          return 'fas fa-recycle';
        case 'b3':
          return 'fas fa-biohazard';
        default:
          return 'fas fa-question-circle';
      }
    },
        handleLimitReached() {
      this.toast.warning('Anda telah mencapai batas maksimal scan tanpa login', {
        timeout: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-right',
      });
    },

    handleOpenLogin() {
      this.showLoginModal = true;
    },

    redirectToLogin() {
      this.$router.push('/');
      this.showLoginModal = false;
    },
  },
};
</script>


<style scoped>
.scan-app {
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
}

.app-title {
  font-size: 2.8rem;
  color: #1F7D53;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 700;
}

.app-title i {
  font-size: 2.5rem;
}

.app-subtitle {
  color: #5a6a72;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 400;
}

.app-content {
  display: grid;
  gap: 2.5rem;
}

.feature-highlight {
  background: linear-gradient(135deg, #42835A 0%, #5CA375 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(46, 125, 50, 0.2);
  margin-bottom: 1.5rem;
}

.highlight-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.steps {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
}

.step-icon {
  background: white;
  color: #2e7d32;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.step p {
  text-align: center;
  margin: 0;
  font-size: 1.1rem;
}

.upload-section {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.results-section {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease-out;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #082E16;
  font-size: 1.3rem;
}

.modal-body {
  padding: 2rem 1.5rem;
  text-align: center;
}

.modal-body p {
  margin-bottom: 1.5rem;
  color: #4B5563;
  font-size: 1.1rem;
}

.login-btn {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.login-btn:hover {
  background: linear-gradient(135deg, #3d8b40, #1b5e20);
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2.2rem;
  }

  .steps {
    flex-direction: column;
    align-items: center;
  }

  .step {
    max-width: 100%;
    width: 100%;
  }

  .upload-section,
  .results-section {
    padding: 1.5rem;
  }



@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
}
</style>