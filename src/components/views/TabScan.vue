<template>
  <div class="scan-app">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">
          <i class="fas fa-recycle"></i> Waste Scanner
        </h1>
        <p class="app-subtitle">Identify waste types with AI technology</p>
      </header>

      <main class="app-content">
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
import { ElMessage } from 'element-plus'; // Import ElMessage

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
      uploadedFile: null, // Tambahkan ini
      analysisResult: null,
      analysisHistory: [],
      isModalOpen: false,
      selectedHistoryItem: null,
      isLoading: false,
    };
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
      ElMessage({
        showClose: true,
        message: 'Analisis berhasil!',
        type: 'success',
        duration: 3000,
        offset: 100,
        customClass: 'custom-message',
      });
      //alert('Analisis berhasil!');
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
      console.error('Analysis error:', error);
      // Tampilkan notifikasi error
      ElMessage({
        showClose: true,
        message: 'Gagal menganalisis gambar. Silakan coba lagi.',
        type: 'error',
        duration: 3000,
        offset: 100,
        customClass: 'custom-message',
      });

    },
    // Tambahkan method untuk format tanggal
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    // Tambahkan method untuk mendapatkan icon
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
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
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
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(46, 125, 50, 0.1);
}

.app-title {
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.app-title i {
  font-size: 2.2rem;
}

.app-subtitle {
  color: #5a6a72;
  font-size: 1.1rem;
  margin: 0;
}

.app-content {
  display: grid;
  gap: 2rem;
}

.upload-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.results-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.history-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
/* Global message styles */
.el-message.custom-message {
  top: 100px;
  right: 20px;
  left: auto !important;
  transform: none !important;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem 1.5rem;
  font-weight: 500;
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