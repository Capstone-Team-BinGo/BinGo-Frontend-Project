<template>
  <section class="upload-section">
    <div class="upload-options">
      <div class="upload-btn" @click="triggerFileInput">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        <span>Unggah Gambar</span>
        <input
          type="file"
          class="file-input"
          accept="image/*"
          @change="handleFileUpload"
          ref="fileInput"
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
          'http://192.168.43.30:5000/predict',
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
/* Tetap sama dengan style yang sebelumnya untuk upload section */
.upload-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  border-color: #4caf50;
  background-color: #f0f0f0;
}

.upload-btn i {
  font-size: 48px;
  color: #4caf50;
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

.preview-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.close-btn {
  background: #ef5757;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 20px;
  transition: color 0.3s;
  border-radius: 4px;
}

.close-btn:hover {
  color: #333;
}

.preview-title {
  margin-bottom: 15px;
  color: #333;
}

.image-preview {
  max-width: 60%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.analyze-btn {
  background-color: #4caf50;
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

/* Loading Animation */
.loading {
  display: none;
  text-align: center;
  margin: 20px 0;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #4caf50;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .upload-options {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .upload-btn {
    width: 150px;
    height: 150px;
  }

  #camera-button {
    display: none; /* Sembunyikan tombol kamera di layar kecil */
  }
}
</style>
