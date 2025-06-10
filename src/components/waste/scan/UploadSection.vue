<template>
  <section class="upload-section">
    <div class="upload-options">
      <div class="upload-btn" @click="triggerFileInput" aria-label="Upload gambar">
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
      <div class="spinner"></div>
      <p>Sedang menganalisis gambar...</p>
    </div>

    <CameraModal
      v-if="showCameraModal"
      @close="closeCamera"
      @picture-taken="handlePictureTaken"
    />
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
    async analyzeImage() {
      if (!this.uploadedFile) return;

      this.isLoading = true; // Set loading state
      this.$emit('loading-started'); // Beri tahu parent komponen

      const formData = new FormData();
      formData.append('file', this.uploadedFile);

      try {
        const response = await axios.post(
          'http://localhost:5000/predict',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        // Format hasil sesuai dengan struktur yang diharapkan
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
        this.$emit('analysis-failed', error); // Event baru untuk error handling
      } finally {
        this.isLoading = false; // Matikan loading
        this.$emit('loading-finished'); // Beri tahu parent komponen
      }
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
  background: linear-gradient(90deg, #4CAF50, #2E7D32);
  transition: all 0.3s;
  transform: scaleX(0);
}

.upload-btn:hover {
  border-color: #4caf50;
  background-color: #f5f5f5;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.upload-btn:hover::before {
  transform: scaleX(1);
}

.upload-btn i {
  font-size: 3.5rem;
  color: #4caf50;
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
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
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #4caf50;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

.loading p {
  color: #555;
  font-size: 1.1rem;
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
</style>