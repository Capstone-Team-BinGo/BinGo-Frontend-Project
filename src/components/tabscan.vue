<template>
  <div class="scan-container">
    <div class="container">
      <!-- Main Content -->
      <h1 class="main-title">Cek Jenis Sampah dari Gambar</h1>

      <!-- Upload Section -->
      <section class="upload-section">
        <div class="upload-options">
          <div class="upload-btn" @click="triggerFileInput">
            <i class="fas fa-upload"></i>
            <span>Unggah Gambar</span>
            <input type="file" class="file-input" accept="image/*" @change="handleFileUpload" ref="fileInput">
          </div>
          <div class="upload-btn" @click="openCamera">
            <i class="fas fa-camera"></i>
            <span>Gunakan Kamera</span>
          </div>
        </div>

        <div class="preview-container" :style="{display: imagePreview ? 'flex' : 'none'}">
          <h3 class="preview-title">Pratinjau Gambar</h3>
          <img :src="imagePreview" class="image-preview" alt="Preview">
          <button class="analyze-btn" @click="analyzeImage" :disabled="!imagePreview">Analisis Gambar</button>
        </div>

        <div class="loading" :style="{display: isLoading ? 'block' : 'none'}">
          <div class="spinner"></div>
          <p>Sedang menganalisis gambar...</p>
        </div>
      </section>

      <!-- Results Section -->
      <section class="results-section" v-if="analysisResult" style="display: block;">
        <h2 class="results-title">Hasil Analisis</h2>
        <div class="result-card">
          <div class="waste-icon">
            <i :class="wasteIcon"></i>
          </div>
          <h3 class="waste-type">{{ analysisResult?.type }}</h3>
          <p class="waste-description">{{ analysisResult?.description }}</p>

          <div class="disposal-info">
            <h4 class="disposal-title">Cara Pembuangan yang Tepat:</h4>
            <ul class="disposal-steps">
              <li v-for="(step, index) in analysisResult?.disposalSteps" :key="index">{{ step }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- History Section -->
      <section class="history-section" v-if="analysisHistory.length > 0">
        <h2 class="history-title">Riwayat Analisis</h2>
        <div class="history-items">
          <div class="history-item" v-for="(item, index) in analysisHistory" :key="index" @click="openHistoryModal(item)">
            <img :src="item.image" class="history-image" alt="History Image">
            <div class="history-type">{{ item.result.type }}</div>
            <div class="history-date">{{ formatDate(item.timestamp) }}</div>
          </div>
        </div>
      </section>

      <!-- History Modal -->
      <div class="modal-overlay" :style="{display: isModalOpen ? 'flex' : 'none'}" @click.self="closeModal">
        <div class="modal-content" v-if="selectedHistoryItem">
          <span class="close-modal" @click="closeModal">&times;</span>
          <h2>Detail Analisis</h2>
          <div class="result-card">
            <img :src="selectedHistoryItem?.image" class="image-preview" style="max-height: 300px; margin-bottom: 20px;" alt="Detail Image">
            <div class="waste-icon">
              <i :class="getWasteIcon(selectedHistoryItem?.result?.type)"></i>
            </div>
            <h3 class="waste-type">{{ selectedHistoryItem?.result?.type }}</h3>
            <p class="waste-description">{{ selectedHistoryItem?.result?.description }}</p>

            <div class="disposal-info">
              <h4 class="disposal-title">Cara Pembuangan yang Tepat:</h4>
              <ul class="disposal-steps">
                <li v-for="(step, index) in selectedHistoryItem?.result?.disposalSteps" :key="index">{{ step }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabScan',
  data() {
    return {
      imagePreview: null,
      analysisResult: null,
      isLoading: false,
      analysisHistory: [],
      isModalOpen: false,
      selectedHistoryItem: null,
      wasteTypes: {
        'Organik': {
          description: 'Sampah organik berasal dari bahan-bahan alami yang dapat terurai secara biologis seperti sisa makanan, daun, dan ranting.',
          disposalSteps: [
            'Pisahkan dari sampah anorganik',
            'Buang di tempat sampah organik',
            'Bisa digunakan untuk kompos jika memungkinkan'
          ],
          icon: 'fas fa-leaf'
        },
        'Anorganik': {
          description: 'Sampah anorganik adalah sampah yang tidak dapat terurai secara alami seperti plastik, kaca, dan logam.',
          disposalSteps: [
            'Pisahkan berdasarkan jenis material (plastik, kaca, logam)',
            'Cuci bersih jika terkontaminasi makanan',
            'Buang di tempat sampah daur ulang atau tempat sampah anorganik'
          ],
          icon: 'fas fa-recycle'
        },
        'B3 (Bahan Berbahaya dan Beracun)': {
          description: 'Sampah B3 mengandung bahan berbahaya seperti baterai, elektronik, dan bahan kimia yang memerlukan penanganan khusus.',
          disposalSteps: [
            'Jangan dibuang bersama sampah biasa',
            'Bawa ke tempat pengumpulan sampah B3',
            'Hubungi layanan pengelolaan limbah berbahaya di daerah Anda'
          ],
          icon: 'fas fa-biohazard'
        },
        'Kertas': {
          description: 'Sampah kertas termasuk koran, kardus, dan kertas kemasan yang dapat didaur ulang.',
          disposalSteps: [
            'Pisahkan dari sampah basah',
            'Lipat atau potong untuk menghemat ruang',
            'Buang di tempat sampah kertas atau bawa ke bank sampah'
          ],
          icon: 'fas fa-file-alt'
        }
      }
    }
  },
  computed: {
    wasteIcon() {
      if (!this.analysisResult) return '';
      return this.wasteTypes[this.analysisResult.type].icon;
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    openCamera() {
      alert('Fitur kamera akan diaktifkan di perangkat yang mendukung. Untuk sekarang, silakan unggah gambar.');
    },
    analyzeImage() {
      this.isLoading = true;

      // Simulate API call with timeout
      setTimeout(() => {
        // Randomly select a waste type for demo purposes
        const types = Object.keys(this.wasteTypes);
        const randomType = types[Math.floor(Math.random() * types.length)];

        this.analysisResult = {
          type: randomType,
          description: this.wasteTypes[randomType].description,
          disposalSteps: this.wasteTypes[randomType].disposalSteps
        };

        // Add to history
        this.analysisHistory.unshift({
          image: this.imagePreview,
          result: {...this.analysisResult},
          timestamp: new Date()
        });

        this.isLoading = false;
      }, 2000);
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    openHistoryModal(item) {
      this.selectedHistoryItem = item;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedHistoryItem = null;
    },
    getWasteIcon(type) {
      return this.wasteTypes[type].icon;
    }
  }
}
</script>

<style scoped>
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

/* Main Content Styles */
.main-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2E7D32;
}

.upload-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.upload-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #f9f9f9;
  text-align: center;
  padding: 20px;
}

.upload-btn:hover {
  border-color: #4CAF50;
  background-color: #f0f0f0;
}

.upload-btn i {
  font-size: 48px;
  color: #4CAF50;
  margin-bottom: 15px;
}

.upload-btn span {
  font-size: 16px;
  color: #555;
}

.file-input {
  display: none;
}

.preview-container {
  margin-top: 30px;
  text-align: center;
  display: none;
  flex-direction: column;
  align-items: center;
}

.preview-title {
  margin-bottom: 15px;
  color: #333;
}

.image-preview {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.analyze-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.analyze-btn:hover {
  background-color: #3e8e41;
}

.analyze-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Results Section */
.results-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 30px;
  display: none;
}

.results-title {
  margin-bottom: 20px;
  color: #2E7D32;
  text-align: center;
}

.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.waste-type {
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 10px;
}

.waste-icon {
  font-size: 60px;
  margin-bottom: 15px;
}

.waste-description {
  text-align: center;
  max-width: 600px;
  margin-bottom: 20px;
  color: #555;
}

.disposal-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
}

.disposal-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.disposal-steps {
  list-style-type: none;
}

.disposal-steps li {
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.disposal-steps li:before {
  content: "•";
  color: #4CAF50;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: -3px;
}

/* History Section */
.history-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.history-title {
  margin-bottom: 20px;
  color: #2E7D32;
}

.history-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.history-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.history-item:hover {
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.history-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.history-type {
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 5px;
}

.history-date {
  font-size: 12px;
  color: #888;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  display: none;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #888;
}

.close-modal:hover {
  color: #333;
}

/* Loading Animation */
.loading {
  display: none;
  text-align: center;
  margin: 20px 0;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #4CAF50;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .upload-options {
    flex-direction: column;
    align-items: center;
  }

  .nav-container {
    flex-direction: column;
  }

  .nav-tabs {
    margin-top: 15px;
  }

  .nav-tab {
    margin: 0 10px;
  }

  .history-items {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .upload-btn {
    width: 150px;
    height: 150px;
  }

  .history-items {
    grid-template-columns: 1fr;
  }
}
</style>