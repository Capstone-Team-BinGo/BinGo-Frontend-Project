<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>
          <i class="fas fa-video"></i>
          Live Scan Real-time
        </h2>
        <button class="close-modal" @click="$emit('close')">&times;</button>
      </div>

      <div class="live-scan-container">
        <!-- Camera Preview -->
        <div class="camera-section">
          <video
            ref="videoElement"
            autoplay
            playsinline
            muted
            class="camera-preview"
          ></video>

          <!-- Status Indicator -->
          <div class="status-indicator" :class="scanStatus">
            <div class="status-dot"></div>
            <span>{{ getStatusText }}</span>
          </div>

          <!-- Camera Controls -->
          <div class="camera-controls">
            <button
              @click="toggleScanning"
              class="scan-toggle-btn"
              :class="{ active: isScanning }"
            >
              <i :class="isScanning ? 'fas fa-pause' : 'fas fa-play'"></i>
              {{ isScanning ? 'Pause Scan' : 'Start Scan' }}
            </button>

            <button @click="switchCamera" class="switch-btn" :disabled="!videoStream">
              <i class="fas fa-sync-alt"></i>
              Switch Camera
            </button>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="results-panel">
          <div class="scan-info">
            <h3>Hasil Deteksi</h3>
            <div class="scan-interval">
              <i class="fas fa-clock"></i>
              Scan setiap 2 detik
            </div>
          </div>

          <!-- Real-time Results -->
          <div class="live-results" v-if="latestResult">
            <div class="result-item">
              <div class="waste-icon-container">
                <i :class="getWasteIcon(latestResult.Sampah)" class="waste-icon"></i>
              </div>

              <div class="result-details">
                <div class="waste-name">{{ latestResult.Sampah }}</div>
                <div class="waste-category">
                  <span class="category-badge" :class="getCategoryClass(latestResult.Kategori)">
                    {{ latestResult.Kategori }}
                  </span>
                </div>
                <div class="accuracy">
                  <i class="fas fa-percentage"></i>
                  Akurasi: {{ latestResult.Akurasi }}%
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div class="empty-results" v-else>
            <i class="fas fa-search"></i>
            <p>Mulai scan untuk melihat hasil deteksi</p>
          </div>

          <!-- Scan History -->
          <div class="scan-history" v-if="scanHistory.length > 0">
            <h4>Riwayat Scan Terakhir</h4>
            <div class="history-list">
              <div
                class="history-item"
                v-for="(item, index) in recentHistory"
                :key="index"
              >
                <i :class="getWasteIcon(item.Sampah)" class="history-icon"></i>
                <div class="history-info">
                  <span class="history-name">{{ item.Sampah }}</span>
                  <span class="history-accuracy">{{ item.Akurasi }}%</span>
                </div>
                <span class="history-time">{{ formatTime(item.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveScanModal',
  data() {
    return {
      videoStream: null,
      currentFacingMode: 'environment',
      isScanning: false,
      scanInterval: null,
      latestResult: null,
      scanHistory: [],
      scanStatus: 'idle', // 'idle', 'scanning', 'processing', 'error'
      errorMessage: '',
      isProcessing: false,
      canvas: null,
      ctx: null,
    };
  },
  computed: {
    getStatusText() {
      const statusMap = {
        idle: 'Siap untuk scan',
        scanning: 'Scanning aktif',
        processing: 'Memproses...',
        error: 'Error'
      };
      return statusMap[this.scanStatus] || 'Unknown';
    },
    recentHistory() {
      return this.scanHistory.slice(-5).reverse();
    }
  },
  mounted() {
    this.initCamera();
    this.setupCanvas();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    async initCamera() {
      try {
        const constraints = {
          video: {
            facingMode: this.currentFacingMode,
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        };

        this.videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        this.$refs.videoElement.srcObject = this.videoStream;
        this.errorMessage = '';
        this.scanStatus = 'idle';

      } catch (error) {
        console.error('Error accessing camera:', error);
        this.errorMessage = 'Tidak dapat mengakses kamera. Pastikan Anda memberikan izin kamera.';
        this.scanStatus = 'error';
      }
    },

    setupCanvas() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    },

    async switchCamera() {
      this.currentFacingMode = this.currentFacingMode === 'user' ? 'environment' : 'user';
      this.stopCamera();
      await this.initCamera();
    },

    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
        this.videoStream = null;
      }
    },

    toggleScanning() {
      if (this.isScanning) {
        this.stopScanning();
      } else {
        this.startScanning();
      }
    },

    startScanning() {
      if (!this.videoStream) {
        this.errorMessage = 'Kamera tidak tersedia';
        return;
      }

      this.isScanning = true;
      this.scanStatus = 'scanning';
      this.errorMessage = '';

      // Start scanning every 2 seconds
      this.scanInterval = setInterval(() => {
        this.performScan();
      }, 2000);

      // Initial scan
      setTimeout(() => {
        this.performScan();
      }, 500);
    },

    stopScanning() {
      this.isScanning = false;
      this.scanStatus = 'idle';

      if (this.scanInterval) {
        clearInterval(this.scanInterval);
        this.scanInterval = null;
      }
    },

    async performScan() {
      if (!this.isScanning || this.isProcessing) return;

      try {
        this.isProcessing = true;
        this.scanStatus = 'processing';

        const videoElement = this.$refs.videoElement;

        // Set canvas size to video dimensions
        this.canvas.width = videoElement.videoWidth || 640;
        this.canvas.height = videoElement.videoHeight || 480;

        // Draw current frame to canvas
        this.ctx.drawImage(videoElement, 0, 0, this.canvas.width, this.canvas.height);

        // Convert canvas to blob
        const blob = await new Promise(resolve => {
          this.canvas.toBlob(resolve, 'image/jpeg', 0.8);
        });

        // Create FormData and send to backend
        const formData = new FormData();
        formData.append('file', blob, 'live-scan.jpg');

        const response = await fetch('https://whoiskywi-trash-scan.hf.space/livescan', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Update latest result
        this.latestResult = result;

        // Add to history with timestamp
        this.scanHistory.push({
          ...result,
          timestamp: new Date()
        });

        // Keep only last 20 results
        if (this.scanHistory.length > 20) {
          this.scanHistory = this.scanHistory.slice(-20);
        }

        this.scanStatus = 'scanning';
        this.errorMessage = '';

      } catch (error) {
        console.error('Scan error:', error);
        this.errorMessage = 'Gagal melakukan scan: ' + error.message;
        this.scanStatus = 'error';

        // Continue scanning even after error
        setTimeout(() => {
          if (this.isScanning) {
            this.scanStatus = 'scanning';
          }
        }, 3000);
      } finally {
        this.isProcessing = false;
      }
    },

    cleanup() {
      this.stopScanning();
      this.stopCamera();
    },

    formatTime(timestamp) {
      return timestamp.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },

    getWasteIcon(wasteType) {
      const iconMap = {
        'Baterai': 'fas fa-battery-half',
        'Daun': 'fas fa-leaf',
        'Elektronik': 'fas fa-mobile-alt',
        'Kaca': 'fas fa-wine-glass',
        'Kardus': 'fas fa-box',
        'Kertas': 'fas fa-file-alt',
        'Lampu': 'fas fa-lightbulb',
        'Logam': 'fas fa-coins',
        'Pakaian': 'fas fa-tshirt',
        'Plastik': 'fas fa-bottle-water',
        'Sampah Makanan': 'fas fa-apple-alt',
        'Sterofom': 'fas fa-cube'
      };
      return iconMap[wasteType] || 'fas fa-trash';
    },

    getCategoryClass(category) {
      const classMap = {
        'Organik': 'organic',
        'Anorganik': 'inorganic',
        'B3': 'hazardous'
      };
      return classMap[category] || 'unknown';
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 1rem;
}

.modal-content {
  background-color: white;
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  border-radius: 16px 16px 0 0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.close-modal {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.live-scan-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  padding: 2rem;
  min-height: 600px;
}

.camera-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.camera-preview {
  width: 100%;
  max-height: 500px;
  background: #000;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.status-indicator {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.status-indicator.idle .status-dot {
  background: #9E9E9E;
}

.status-indicator.scanning .status-dot {
  background: #4CAF50;
}

.status-indicator.processing .status-dot {
  background: #FF9800;
}

.status-indicator.error .status-dot {
  background: #F44336;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.camera-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.scan-toggle-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.scan-toggle-btn.active {
  background: #FF5722;
  box-shadow: 0 4px 12px rgba(255, 87, 34, 0.3);
}

.scan-toggle-btn:hover {
  transform: translateY(-2px);
}

.switch-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.switch-btn:hover:not(:disabled) {
  background: #4CAF50;
  color: white;
  transform: translateY(-2px);
}

.switch-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.results-panel {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
  max-height: 600px;
  overflow-y: auto;
}

.scan-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.scan-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.3rem;
}

.scan-interval {
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.live-results {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: resultFadeIn 0.5s ease;
}

@keyframes resultFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.waste-icon-container {
  flex-shrink: 0;
}

.waste-icon {
  font-size: 2.5rem;
  color: #4CAF50;
}

.result-details {
  flex: 1;
}

.waste-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.category-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.category-badge.organic {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
}

.category-badge.inorganic {
  background: linear-gradient(135deg, #2196F3, #1976D2);
}

.category-badge.hazardous {
  background: linear-gradient(135deg, #F44336, #D32F2F);
}

.accuracy {
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.empty-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}

.empty-results i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ddd;
}

.scan-history {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scan-history h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1rem;
  text-align: center;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.85rem;
}

.history-icon {
  color: #4CAF50;
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.history-name {
  font-weight: 600;
  color: #333;
}

.history-accuracy {
  color: #666;
  font-size: 0.8rem;
}

.history-time {
  color: #999;
  font-size: 0.75rem;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 1rem 2rem;
  margin: 0;
  border-top: 1px solid #ffcdd2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .live-scan-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .results-panel {
    max-height: none;
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-header h2 {
    font-size: 1.2rem;
  }

  .live-scan-container {
    padding: 1rem;
    gap: 1rem;
  }

  .camera-controls {
    flex-direction: column;
    align-items: center;
  }

  .scan-toggle-btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .result-item {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }

  .history-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .history-info {
    align-items: center;
  }
}
</style>