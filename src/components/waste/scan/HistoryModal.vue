<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <span class="close-modal" @click="$emit('close')">&times;</span>
      <h2>Detail Analisis</h2>
      <div class="result-card">
        <img
          :src="selectedHistoryItem.image"
          class="image-preview"
          alt="Detail Image"
        />
        <div class="waste-icon">
          <i :class="selectedHistoryItem.result.wasteIcon"></i>
        </div>
        <h3 class="waste-name">{{ selectedHistoryItem.result.itemName }}</h3>
        <div class="waste-category">
          <span class="category-badge">{{ selectedHistoryItem.result.type }}</span>
        </div>
        <p class="waste-description">
          {{ selectedHistoryItem.result.description }}
        </p>

        <div class="disposal-info">
          <h4 class="disposal-title"><i class="fas fa-trash-alt"></i> Cara Pembuangan yang Tepat:</h4>
          <ul class="disposal-steps">
            <li
              v-for="(step, index) in selectedHistoryItem.result.disposalSteps"
              :key="index"
            >
              <i class="fas fa-check-circle"></i> {{ step }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedHistoryItem: {
      type: Object,
      required: true, // Tambahkan validasi
      default: () => ({
        image: '',
        result: {
          itemName: '',
          type: '',
          description: '',
          wasteIcon: '',
          disposalSteps: []
        }
      }) // Nilai default untuk menghindari error
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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

.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.waste-icon {
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 1rem;
}

.waste-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
}

.waste-category {
  margin-bottom: 1.5rem;
}

.category-badge {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.2);
}

.waste-description {
  text-align: center;
  max-width: 600px;
  margin-bottom: 1.5rem;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
}

.disposal-info {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
}

.disposal-title {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.disposal-title i {
  color: #4CAF50;
}

.disposal-steps {
  list-style-type: none;
  padding-left: 0;
}

.disposal-steps li {
  margin-bottom: 0.8rem;
  padding-left: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  line-height: 1.5;
}

.disposal-steps li i {
  color: #4CAF50;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .waste-name {
    font-size: 1.5rem;
  }
  
  .image-preview {
    max-height: 250px;
  }
}
</style>