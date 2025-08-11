<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <span class="close-modal" @click="$emit('close')">&times;</span>
      <h2>Detail Analisis</h2>
      <div class="result-card">
        <!-- Waste Icon -->
        <div class="waste-icon-container">
          <div class="waste-icon-large" :class="getCategoryClass(historyItem.category)">
            <i :class="getWasteIcon(historyItem.waste_type)"></i>
          </div>
        </div>

        <h3 class="waste-name">{{ historyItem.waste_type }}</h3>

        <div class="waste-category">
          <span class="category-badge" :class="getCategoryClass(historyItem.category)">
            {{ historyItem.category }}
          </span>
        </div>

        <p class="waste-description">
          {{ historyItem.description }}
        </p>

        <!-- Disposal Info -->
        <div class="info-section disposal-info">
          <h4 class="section-title">
            <i class="fas fa-trash-alt"></i>
            Cara Pembuangan yang Tepat:
          </h4>
          <ul class="disposal-steps">
            <li
              v-for="(step, index) in historyItem.disposal_steps"
              :key="index"
            >
              <i class="fas fa-check-circle"></i> {{ step }}
            </li>
          </ul>
        </div>

        <!-- Scan Info -->
        <div class="info-section scan-info">
          <div class="info-item">
            <i class="fas fa-calendar"></i>
            <div class="info-text">
              <span class="info-label">Tanggal Scan:</span>
              <span class="info-value">{{ formatDate(historyItem.scan_date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryModal',
  props: {
    historyItem: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        waste_type: '',
        category: '',
        description: '',
        disposal_steps: [],
        scan_date: ''
      })
    }
  },
  methods: {
    formatDate(dateString) {
      try {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch {
        return 'Tanggal tidak valid';
      }
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
  background-color: rgba(0, 0, 0, 0.7);
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
  padding: 2rem;
  width: 100%;
  max-width: 500px;
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
  font-size: 1.8rem;
  cursor: pointer;
  color: #888;
  transition: all 0.3s;
  line-height: 1;
}

.close-modal:hover {
  color: #333;
  transform: rotate(90deg);
}

h2 {
  font-size: 1.5rem;
  color: #2e7d32;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.waste-icon-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.waste-icon-large {
  font-size: 2.5rem;
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.waste-icon-large.organic {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
}

.waste-icon-large.inorganic {
  background: linear-gradient(135deg, #2196F3, #1976D2);
}

.waste-icon-large.hazardous {
  background: linear-gradient(135deg, #F44336, #D32F2F);
}

.waste-icon-large.unknown {
  background: linear-gradient(135deg, #9E9E9E, #616161);
}

.waste-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  text-align: center;
}

.waste-category {
  margin: 0;
}

.category-badge {
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
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

.category-badge.unknown {
  background: linear-gradient(135deg, #9E9E9E, #616161);
}

.waste-description {
  text-align: center;
  margin: 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
}

.info-section {
  width: 100%;
  padding: 1.25rem;
  border-radius: 12px;
  background-color: #f9f9f9;
}

.disposal-info {
  background-color: #f0f8ff;
}

.scan-info {
  background-color: #f5f5f5;
}

.section-title {
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  color: #4CAF50;
}

.disposal-steps {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.disposal-steps li {
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

.info-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item i {
  color: #4CAF50;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.info-label {
  font-weight: 600;
  color: #333;
  font-size: 0.85rem;
}

.info-value {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  .waste-name {
    font-size: 1.3rem;
  }

  .waste-icon-large {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .category-badge {
    padding: 0.4rem 1.2rem;
    font-size: 0.8rem;
  }

  .waste-description {
    font-size: 0.9rem;
  }

  .info-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .disposal-steps li {
    font-size: 0.9rem;
  }

  .info-label, .info-value {
    font-size: 0.8rem;
  }
}
</style>