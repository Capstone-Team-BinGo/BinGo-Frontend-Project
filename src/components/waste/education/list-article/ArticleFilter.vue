<template>
  <div class="filter-container">
    <div class="filter-header">
      <h2 class="filter-title">
        <i class="fas fa-filter"></i> Filter Articles
      </h2>
      <div class="filter-tabs">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="$emit('filter-change', filter.value)"
          :class="{ active: activeFilter === filter.value }"
          class="filter-tab">
          <i :class="filter.icon"></i>
          {{ filter.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleFilter',
  props: {
    activeFilter: {
      type: String,
      default: 'all',
      required: true
    }
  },
  data() {
    return {
      filters: [
        { value: 'all', label: 'Semua Artikel', icon: 'fas fa-layer-group' },
        { value: 'organik', label: 'Organik', icon: 'fas fa-leaf' },
        { value: 'anorganik', label: 'Anorganik', icon: 'fas fa-recycle' },
        { value: 'b3', label: 'B3', icon: 'fas fa-biohazard' }
      ]
    };
  }
};
</script>

<style scoped>
.filter-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.filter-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-title {
  font-size: 1.4rem;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
}

.filter-title i {
  font-size: 1.2rem;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tab {
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  background: #e0e0e0;
}

.filter-tab.active {
  background: #2e7d32;
  color: white;
}

.filter-tab i {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .filter-tabs {
    gap: 0.5rem;
  }

  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>