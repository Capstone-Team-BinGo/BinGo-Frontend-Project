<template>
  <section class="upload-section">
    <div class="upload-options">
      <div
        class="upload-btn"
        @click="triggerFileInput"
        aria-label="Upload gambar"
      >
        <i class="fa-solid fa-cloud-arrow-up"></i>
        <span>Unggah Gambar</span>
        <input
          type="file"
          class="file-input"
          accept="image/*"
          @change="handleFileUpload"
          ref="fileInput"
          style="display: none"
        />
      </div>
      <div class="upload-btn" id="camera-button" @click="openCamera">
        <i class="fas fa-camera"></i>
        <span>Gunakan Kamera</span>
      </div>
    </div>

    <div
      class="preview-container"
      :style="{ display: imagePreview ? 'flex' : 'none' }"
    >
      <div class="preview-header">
        <h3 class="preview-title">Pratinjau Gambar</h3>
        <button class="close-btn" @click="clearPreview">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <img :src="imagePreview" class="image-preview" alt="Preview" />
      <button
        class="analyze-btn"
        @click="analyzeImage"
        :disabled="!imagePreview || isLoading"
      >
        {{ isLoading ? 'Menganalisis...' : 'Analisis Gambar' }}
      </button>
    </div>

    <div class="loading" :style="{ display: isLoading ? 'block' : 'none' }">
      <div class="spinner-container">
        <div class="spinner">
          <div class="spinner-inner"></div>
        </div>
      </div>
      <p class="loading-text">Sedang menganalisis gambar...</p>
      <p class="loading-subtext">Proses mungkin memakan waktu beberapa detik</p>
    </div>

    <CameraModal
      v-if="showCameraModal"
      @close="closeCamera"
      @picture-taken="handlePictureTaken"
    />

        <!-- Tambahkan modal untuk limit dan login -->
    <div v-if="showLimitModal" class="limit-modal-overlay">
      <div class="limit-modal">
        <div class="modal-header">
          <h3>Limit Penggunaan</h3>
          <button class="close-btn" @click="showLimitModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <i class="fas fa-exclamation-triangle warning-icon"></i>
          <p>Anda telah mencapai batas maksimal 3 scan dalam 24 jam tanpa login.</p>
          <p>Login untuk mendapatkan akses penuh tanpa batas!</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showLimitModal = false">
            Nanti Saja
          </button>
          <button class="login-btn" @click="triggerLogin">
            Login Sekarang
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import CameraModal from './CameraModal.vue';

export default {
  components: { CameraModal },
  data() {
    return {
      imagePreview: null,
      uploadedFile: null,
      showCameraModal: false,
      isLoading: false,
      showLimitModal: false,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
          this.$emit('file-uploaded', {
            imagePreview: e.target.result,
            uploadedFile: file,
          });
        };
        reader.readAsDataURL(file);
      }
    },
    openCamera() {
      this.showCameraModal = true;
    },
    closeCamera() {
      this.showCameraModal = false;
    },
    handlePictureTaken({ imagePreview, uploadedFile }) {
      this.imagePreview = imagePreview;
      this.uploadedFile = uploadedFile;
      this.closeCamera();
      //this.$emit('file-uploaded', { imagePreview, uploadedFile });
    },
    clearPreview() {
      this.imagePreview = null;
      this.uploadedFile = null;
      this.$refs.fileInput.value = ''; // Reset file input
      this.$emit('preview-cleared');
    },
getAccessToken() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user?.stsTokenManager?.accessToken || null;

    return accessToken;
  } catch (e) {
    //console.warn('Gagal membaca accessToken dari localStorage', e);
    return null;
  }
},

    async analyzeImage() {
      if (!this.uploadedFile) return;

      this.isLoading = true;
      this.$emit('loading-started');

      const formData = new FormData();
      formData.append('file', this.uploadedFile);

      const accessToken = this.getAccessToken();
      let uid = null;

      try {
        const user = JSON.parse(localStorage.getItem('user'));
        uid = user?.uid || null;
      } catch (e) {
        // Gagal membaca UID dari localStorage
      }

      try {
        const response = await axios.post(
          'http://103.67.78.27:5000/predict',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
              ...(uid && { 'User-Uid': uid }),
            },
          }
        );

        const result = {
          itemName: response.data.Sampah,
          type: response.data.Kategori,
          description: response.data.Deskripsi,
          wasteIcon: this.$parent.getIconByKategori(response.data.Kategori),
          disposalSteps: response.data.LangkahPembuangan,
        };

        this.$emit('image-analyzed', result);
      } catch (error) {
        console.error('Error analyzing image:', error);

        // Tangani error limit
        if (error.response && error.response.data.error === "Anonymous uploads limited to 3 per 24 hours.") {
          this.showLimitModal = true;
          this.$emit('limit-reached');
        } else {
          this.$emit('analysis-failed', error);
        }
      } finally {
        this.isLoading = false;
        this.$emit('loading-finished');
      }
    },

    triggerLogin() {
      this.showLimitModal = false;
      this.$emit('open-login'); // Sama dengan event di home.vue
    },

  },
};
</script>

<style scoped>
.upload-section {
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  border: 1px solid rgba(46, 125, 50, 0.1);
}

.upload-options {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 220px;
  border: 2px dashed rgba(76, 175, 80, 0.3);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #f9f9f9;
  text-align: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.upload-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4caf50, #2e7d32);
  transition: all 0.3s;
  transform: scaleX(0);
}

.upload-btn:hover {
  border-color: #082e16;
  background-color: #f5f5f5;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.upload-btn:hover::before {
  transform: scaleX(1);
}

.upload-btn i {
  font-size: 3.5rem;
  color: #1f7d53;
  margin-bottom: 1.5rem;
  transition: all 0.3s;
}

.upload-btn:hover i {
  transform: scale(1.1);
}

.upload-btn span {
  font-size: 1.2rem;
  color: #555;
  font-weight: 500;
}

.preview-container {
  margin-top: 2rem;
  text-align: center;
  display: none;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preview-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
}

.preview-title {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-btn {
  background: #ef5757;
  border: none;
  cursor: pointer;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #e33434;
  transform: rotate(90deg);
}

.close-btn i {
  font-size: 1.2rem;
}

.image-preview {
  max-width: 100%;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.analyze-btn {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.analyze-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

.analyze-btn:disabled {
  background: #cccccc;
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
}

.loading {
  display: none;
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: rgba(249, 249, 249, 0.9);
  border: 1px solid rgba(76, 175, 80, 0.2);
  animation: fadeIn 0.3s ease-out;
}

.spinner-container {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
}

.spinner {
  width: 100%;
  height: 100%;
  border: 3px solid rgba(76, 175, 80, 0.1);
  border-radius: 50%;
  border-top: 3px solid #4caf50;
  animation: spin 1s linear infinite;
  position: relative;
}

.spinner-inner {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid #2e7d32;
  animation: spinReverse 1.5s linear infinite;
}

.loading-text {
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.loading-subtext {
  color: #666;
  font-size: 0.85rem;
  opacity: 0.8;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinReverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-720deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .loading {
    padding: 1.2rem;
  }

  .spinner-container {
    width: 50px;
    height: 50px;
  }

  .loading-text {
    font-size: 1rem;
  }

  .loading-subtext {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .upload-options {
    flex-direction: column;
    align-items: center;
  }

  .upload-btn {
    max-width: 300px;
  }

  .image-preview {
    max-height: 300px;
  }
}

@media (max-width: 480px) {
  .upload-section {
    padding: 1.5rem;
  }

  .upload-btn {
    height: 180px;
  }

  .upload-btn i {
    font-size: 2.5rem;
  }

  .analyze-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

.limit-modal-overlay {
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

.limit-modal {
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

.warning-icon {
  font-size: 3rem;
  color: #F59E0B;
  margin-bottom: 1.5rem;
}

.modal-body p {
  margin: 0.5rem 0;
  color: #4B5563;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #eee;
}

.cancel-btn, .login-btn {
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #F3F4F6;
  color: #4B5563;
  border: none;
  margin-right: 0.5rem;
}

.cancel-btn:hover {
  background: #E5E7EB;
}

.login-btn {
  background: #082E16;
  color: white;
  border: none;
  margin-left: 0.5rem;
}

.login-btn:hover {
  background: #065F46;
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
</style>
