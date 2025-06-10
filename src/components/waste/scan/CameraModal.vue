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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  cursor: pointer;
  color: #888;
  transition: all 0.3s;
}

.close-modal:hover {
  color: #333;
  transform: rotate(90deg);
}

h2 {
  font-size: 1.8rem;
  color: #2e7d32;
  margin-bottom: 1.5rem;
  text-align: center;
}

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
  border-radius: 12px;
  display: block;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.camera-controls {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 1.5rem;
}

.capture-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: white;
  border: 5px solid #f5f5f5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #2e7d32;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.capture-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.capture-btn:active {
  transform: scale(0.95);
}

.switch-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
}

.switch-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .capture-btn {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
  
  .switch-btn {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
}
</style>