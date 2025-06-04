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
        <img :src="item.image" class="history-image" alt="History Image" />
        <div class="history-type">{{ item.result.itemName }}</div>
        <div class="history-date">{{ formatDate(item.timestamp) }}</div>
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
/* Tetap sama dengan style history section sebelumnya */
/* History Section */
.history-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.history-title {
  margin-bottom: 20px;
  color: #2e7d32;
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  color: #4caf50;
  margin-bottom: 5px;
}

.history-date {
  font-size: 12px;
  color: #888;
}

/* Media Queries */
@media (max-width: 768px) {
  .history-items {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .history-items {
    grid-template-columns: 1fr;
  }
}
</style>