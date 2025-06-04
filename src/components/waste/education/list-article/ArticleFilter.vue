<template>
  <section class="filter-section">
    <h2 class="filter-title">Filter Artikel</h2>
    <div class="filter-buttons">
      <button
        @click="$emit('filter-change', 'all')"
        :class="{ active: activeFilter === 'all' }"
        class="filter-btn">
        Semua Artikel
      </button>
      <button
        @click="$emit('filter-change', 'organik')"
        :class="{ active: activeFilter === 'organik' }"
        class="filter-btn">
        Organik
      </button>
      <button
        @click="$emit('filter-change', 'anorganik')"
        :class="{ active: activeFilter === 'anorganik' }"
        class="filter-btn">
        Anorganik
      </button>
      <button
        @click="$emit('filter-change', 'b3')"
        :class="{ active: activeFilter === 'b3' }"
        class="filter-btn">
        B3
      </button>
    </div>
  </section>
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
  }
};
</script>

<style scoped>
.filter-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.filter-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #2e7d32;
  font-weight: 600;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-btn:hover {
  background-color: #f0f0f0;
}

.filter-btn.active {
  background-color: #2e7d32;
  color: white;
  border-color: #2e7d32;
}
</style>