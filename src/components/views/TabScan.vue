<template>
  <div class="scan-container">
    <div class="container">
      <h1 class="main-title">Cek Jenis Sampah</h1>

      <UploadSection
        @file-uploaded="handleFileUploaded"
        @image-analyzed="handleImageAnalyzed"
        @loading-started="handleLoadingStarted"
        @loading-finished="handleLoadingFinished"
        @analysis-failed="handleAnalysisFailed"
      />

      <ResultsSection v-if="analysisResult" :analysisResult="analysisResult" />

      <HistorySection
        v-if="analysisHistory.length > 0"
        :analysisHistory="analysisHistory"
        @show-history="showHistoryItem"
      />

      <HistoryModal
        v-if="isModalOpen"
        :selectedHistoryItem="selectedHistoryItem"
        @close="closeModal"
      />
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
/* Tetap sama dengan yang sebelumnya */
.scan-container {
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2e7d32;
}

.el-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}
</style>

<style>
.el-message.custom-message {
  top: 100px;
  right: 20px;
  left: auto !important;
  transform: none !important; /* Menghapus transformasi default */
}
</style>