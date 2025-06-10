<template>
  <section class="history-section" v-if="analysisHistory.length > 0">
    <h2 class="history-title">Riwayat Analisis</h2>
    <div class="history-items">
      <div
        class="history-item"
        v-for="(item, index) in analysisHistory"
        :key="index"
        @click="$emit('show-history', item)"
      >
        <div class="item-overlay">
          <i class="fas fa-eye"></i> Lihat Detail
        </div>
        <img :src="item.image" class="history-image" alt="History Image" />
        <div class="history-details">
          <div class="history-type">{{ item.result.itemName }}</div>
          <div class="history-date">{{ formatDate(item.timestamp) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    analysisHistory: {
      type: Array,
      default: () => [] // Pastikan selalu berupa array
    }
  },
  methods: {
    formatDate(date) {
      try {
        return new Date(date).toLocaleString();
      } catch {
        return 'Tanggal tidak valid';
      }
    }
  }
};
</script>

<style scoped>
.history-section {
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(46, 125, 50, 0.1);
}

.history-title {
  margin-bottom: 1.5rem;
  color: #2e7d32;
  font-size: 1.8rem;
  font-weight: 600;
}

.history-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.history-item {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.history-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(46, 125, 50, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2;
  font-weight: 600;
  font-size: 1.2rem;
  gap: 0.5rem;
}

.history-item:hover .item-overlay {
  opacity: 1;
}

.history-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.history-details {
  padding: 1rem;
  background: white;
}

.history-type {
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-date {
  font-size: 0.85rem;
  color: #888;
}

@media (max-width: 768px) {
  .history-section {
    padding: 1.5rem;
  }
  
  .history-items {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 480px) {
  .history-items {
    grid-template-columns: 1fr;
  }
  
  .history-image {
    height: 150px;
  }
}
</style>