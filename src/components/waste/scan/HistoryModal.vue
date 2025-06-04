<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <span class="close-modal" @click="$emit('close')">&times;</span>
      <h2>Detail Analisis</h2>
      <div class="result-card">
        <img
          :src="selectedHistoryItem.image"
          class="image-preview"
          style="max-height: 300px; margin-bottom: 20px"
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
          <h4 class="disposal-title">Cara Pembuangan yang Tepat:</h4>
          <ul class="disposal-steps">
            <li
              v-for="(step, index) in selectedHistoryItem.result.disposalSteps"
              :key="index"
            >
              {{ step }}
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
/* Tetap sama dengan style modal sebelumnya */
/* Modal Styles */
.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.waste-name {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.waste-category {
  margin-bottom: 15px;
}

.category-badge {
  background-color: #4CAF50;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
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
  content: '•';
  color: #4caf50;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: -3px;
}

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

@media (max-width: 480px) {
  .image-preview {
    width: 100%;
  }
}
</style>