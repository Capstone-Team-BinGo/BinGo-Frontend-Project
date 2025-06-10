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
              <div class="step">
                <div class="step-icon">1</div>
                <p>Unggah atau ambil foto</p>
              </div>
              <div class="step">
                <div class="step-icon">2</div>
                <p>Biarkan AI kami menganalisis</p>
              </div>
              <div class="step">
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
          <HistorySection
            v-if="analysisHistory.length > 0"
            :analysisHistory="analysisHistory"
            @show-history="showHistoryItem"
            class="history-section"
          />
        </transition>

        <HistoryModal
          v-if="isModalOpen"
          :selectedHistoryItem="selectedHistoryItem"
          @close="closeModal"
        />
      </main>
    </div>
  </div>
</template>

<script>
import UploadSection from '../waste/scan/UploadSection.vue';
import ResultsSection from '../waste/scan/ResultsSection.vue';
import HistorySection from '../waste/scan/HistorySection.vue';
import HistoryModal from '../waste/scan/HistoryModal.vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'TabScan',
  components: {
    UploadSection,
    ResultsSection,
    HistorySection,
    HistoryModal,
  },
  data() {
    return {
      imagePreview: null,
      uploadedFile: null,
      analysisResult: null,
      analysisHistory: [],
      isModalOpen: false,
      selectedHistoryItem: null,
      isLoading: false,
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
      this.analysisHistory.unshift({
        image: this.imagePreview,
        result: { ...result },
        timestamp: new Date(),
      });
      this.toast.success('Analisis berhasil!', {
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-right',
      });
    },
    showHistoryItem(item) {
      this.selectedHistoryItem = item;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedHistoryItem = null;
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
    formatDate(date) {
      return new Date(date).toLocaleString();
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
  },
};
</script>


<style scoped>
.scan-app {
  background: linear-gradient(135deg, #f0f9f0 0%, #e6f4e6 100%);
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
  color: #2e7d32;
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
  background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
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

.history-section {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  .results-section,
  .history-section {
    padding: 1.5rem;
  }
}
</style>

<style>
/* Global message styles */
.el-message.custom-message {
  top: 100px;
  right: 20px;
  left: auto !important;
  transform: none !important;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  padding: 1rem 1.5rem;
  font-weight: 500;
  font-size: 1rem;
}

.el-message--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #2e7d32;
}

.el-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
</style>