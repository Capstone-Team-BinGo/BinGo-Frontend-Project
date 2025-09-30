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

        <!-- Scan Mode Selector -->
        <div class="scan-mode-selector">
          <h3 class="mode-title">Pilih Mode Pemindaian</h3>
          <div class="mode-options">
            <div class="mode-card" :class="{ active: scanMode === 'standard' }" @click="setScanMode('standard')">
              <div class="mode-icon">
                <i class="fas fa-camera"></i>
              </div>
              <h4>Scan Standar</h4>
              <p>Upload atau ambil foto untuk analisis mendalam</p>
              <div class="mode-features">
                <span><i class="fas fa-check"></i> Hasil detail</span>
                <span><i class="fas fa-check"></i> Simpan riwayat</span>
                <span><i class="fas fa-check"></i> Panduan lengkap</span>
              </div>
            </div>

            <div class="mode-card" :class="{ active: scanMode === 'live' }" @click="setScanMode('live')">
              <div class="mode-icon live">
                <i class="fas fa-video"></i>
              </div>
              <h4>Live Scan</h4>
              <p>Deteksi real-time menggunakan kamera</p>
              <div class="mode-features">
                <span><i class="fas fa-check"></i> Real-time</span>
                <span><i class="fas fa-check"></i> Scan otomatis</span>
                <span><i class="fas fa-check"></i> Cepat & mudah</span>
              </div>
              <div class="live-badge">
                <i class="fas fa-bolt"></i> LIVE
              </div>
            </div>
          </div>
        </div>

        <!-- Standard Scan Section -->
        <div v-if="scanMode === 'standard'">
          <UploadSection
            @file-uploaded="handleFileUploaded"
            @image-analyzed="handleImageAnalyzed"
            @loading-started="handleLoadingStarted"
            @loading-finished="handleLoadingFinished"
            @analysis-failed="handleAnalysisFailed"
            @rate-limit-hit="handleRateLimitHit"
            @reset-analysis="resetAnalysis"
            class="upload-section"
          />

          <transition name="fade-slide">
            <ResultsSection
              v-if="analysisResult"
              :analysisResult="analysisResult"
              class="results-section"
            />
          </transition>
        </div>

        <!-- Live Scan Section -->
        <div v-if="scanMode === 'live'" class="live-scan-section">
          <div class="live-scan-info">
            <div class="info-card">
              <i class="fas fa-info-circle"></i>
              <div>
                <h4>Tentang Live Scan</h4>
                <p>Mode Live Scan memungkinkan Anda mendeteksi sampah secara real-time menggunakan kamera. Sistem akan otomatis menganalisis gambar setiap 2 detik.</p>
              </div>
            </div>
          </div>

          <div class="live-scan-action">
            <button class="start-live-scan-btn" @click="startLiveScan">
              <div class="btn-content">
                <i class="fas fa-video"></i>
                <div class="btn-text">
                  <span class="btn-title">Mulai Live Scan</span>
                  <span class="btn-subtitle">Deteksi real-time dengan kamera</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- History Section -->
        <transition name="fade-slide">
          <HistorySection
            :userUid="userUid"
            @show-history-detail="showHistoryModal"
            @history-deleted="onHistoryDeleted"
            ref="historySection"
            class="history-section-component"
          />
        </transition>

        <!-- History Detail Modal -->
        <HistoryModal
          v-if="showModal && selectedHistoryItem"
          :historyItem="selectedHistoryItem"
          @close="closeHistoryModal"
        />

        <!-- Live Scan Modal -->
        <LiveScanModal
          v-if="showLiveScanModal"
          @close="closeLiveScan"
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
import LiveScanModal from '../waste/scan/LiveScanModal.vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'TabScan',
  components: {
    UploadSection,
    ResultsSection,
    HistorySection,
    HistoryModal,
    LiveScanModal,
  },
  data() {
    return {
      imagePreview: null,
      uploadedFile: null,
      analysisResult: null,
      isLoading: false,
      showModal: false,
      selectedHistoryItem: null,
      userUid: null,
      scanMode: 'standard', // 'standard' or 'live'
      showLiveScanModal: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.getUserUid();
  },
  methods: {
    getUserUid() {
      let userUid = null;
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          userUid = parsedUser.uid;
        }

      } catch (error) {
        console.warn('Failed to get user data:', error);
        userUid = null;
      }

      this.userUid = userUid;
    },

    setScanMode(mode) {
      this.scanMode = mode;
      if (mode === 'standard') {
        this.showLiveScanModal = false;
      }
    },

    startLiveScan() {
      this.showLiveScanModal = true;
    },

    closeLiveScan() {
      this.showLiveScanModal = false;
    },

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

      if (this.userUid && this.$refs.historySection) {
        this.$nextTick(() => {
          this.$refs.historySection.refreshHistory();
        });
      }
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

    handleRateLimitHit(message) {
      this.toast.warning(message, {
        timeout: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-right',
      });
    },

    resetAnalysis() {
      this.analysisResult = null;
    },

    showHistoryModal(historyItem) {
      this.selectedHistoryItem = historyItem;
      this.showModal = true;
    },

    closeHistoryModal() {
      this.showModal = false;
      this.selectedHistoryItem = null;
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

/* Scan Mode Selector */
.scan-mode-selector {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.mode-title {
  text-align: center;
  color: #2e7d32;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.mode-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.mode-card {
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.mode-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #2E7D32);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.mode-card:hover {
  border-color: #4CAF50;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.2);
}

.mode-card:hover::before {
  transform: scaleX(1);
}

.mode-card.active {
  border-color: #4CAF50;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(46, 125, 50, 0.05));
}

.mode-card.active::before {
  transform: scaleX(1);
}

.mode-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.mode-icon.live {
  background: linear-gradient(135deg, #FF5722, #E64A19);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.mode-card:hover .mode-icon {
  transform: scale(1.1) rotate(5deg);
}

.mode-card h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.mode-card p {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.mode-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mode-features span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  font-size: 0.9rem;
}

.mode-features i {
  color: #4CAF50;
  font-size: 0.8rem;
}

.live-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #FF5722, #E64A19);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  animation: livePulse 1.5s infinite;
}

@keyframes livePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

/* Live Scan Section */
.live-scan-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.live-scan-info {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.info-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(21, 101, 192, 0.05));
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #2196F3;
}

.info-card i {
  font-size: 2rem;
  color: #2196F3;
  flex-shrink: 0;
}

.info-card h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
}

.info-card p {
  margin: 0;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.live-scan-action {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.start-live-scan-btn {
  background: linear-gradient(135deg, #FF5722, #E64A19);
  color: white;
  border: none;
  padding: 0;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 87, 34, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}

.start-live-scan-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.start-live-scan-btn:hover::before {
  width: 300px;
  height: 300px;
}

.start-live-scan-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(255, 87, 34, 0.4);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 3rem;
  position: relative;
  z-index: 1;
}

.btn-content i {
  font-size: 2.5rem;
}

.btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.btn-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.btn-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 400;
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

  .mode-options {
    grid-template-columns: 1fr;
  }

  .btn-content {
    padding: 1.2rem 2rem;
    gap: 1rem;
  }

  .btn-content i {
    font-size: 2rem;
  }

  .btn-title {
    font-size: 1.2rem;
  }

  .btn-subtitle {
    font-size: 0.8rem;
  }

  .upload-section,
  .results-section {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 1rem;
  }

  .feature-highlight {
    padding: 1.5rem;
  }

  .scan-mode-selector {
    padding: 1.5rem;
  }

  .mode-card {
    padding: 1.5rem;
  }

  .info-card {
    flex-direction: column;
    gap: 1rem;
  }

  .btn-content {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .btn-text {
    align-items: center;
  }
}
</style>