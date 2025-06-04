<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <span class="close-modal" @click="$emit('close')">&times;</span>
      <h2>Ambil Foto</h2>

      <div class="camera-container">
        <video ref="videoElement" autoplay playsinline class="camera-preview"></video>
        <canvas ref="canvasElement" style="display: none"></canvas>

        <div class="camera-controls">
          <button @click="takePicture" class="capture-btn">
            <i class="fas fa-camera"></i>
          </button>
          <button @click="switchCamera" class="switch-btn">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoStream: null,
      currentFacingMode: 'environment'
    };
  },
  mounted() {
    this.startCamera();
  },
  beforeUnmount() {
    this.stopCamera();
  },
  methods: {
    async startCamera() {
      try {
        const constraints = {
          video: {
            facingMode: this.currentFacingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };

        this.videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        this.$refs.videoElement.srcObject = this.videoStream;
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
        this.$emit('close');
      }
    },
    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
      }
    },
    takePicture() {
      const video = this.$refs.videoElement;
      const canvas = this.$refs.canvasElement;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const uploadedFile = new File([blob], 'camera-photo.jpg', {
          type: 'image/jpeg'
        });

        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit('picture-taken', {
            imagePreview: e.target.result,
            uploadedFile
          });
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.9);
    },
    async switchCamera() {
      this.currentFacingMode = this.currentFacingMode === 'user' ? 'environment' : 'user';
      this.stopCamera();
      await this.startCamera();
    }
  }
};
</script>

<style scoped>
/* Tetap sama dengan style camera modal sebelumnya */
/* Camera Modal Styles */
.camera-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.camera-preview {
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 70vh;
  background: #000;
  border-radius: 8px;
  display: block;
}

.camera-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

.capture-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.switch-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

/* Modal Styles */
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
</style>