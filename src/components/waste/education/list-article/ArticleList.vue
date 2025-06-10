<template>
  <section class="article-grid">
    <div v-if="isLoading" class="empty-state">
      <i class="fas fa-spinner fa-spin"></i>
      <h3>Loading articles...</h3>
    </div>
    <div v-else-if="error" class="empty-state">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Error loading articles</h3>
      <p>{{ error }}</p>
    </div>
    <div v-else-if="articles.length === 0" class="empty-state">
      <i class="fas fa-newspaper"></i>
      <h3>No articles found</h3>
      <p>Try changing your filter or check back later</p>
    </div>
    <template v-else>
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </template>
  </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue';

export default {
  name: 'ArticleList',
  components: { ArticleCard },
  props: {
    articles: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.empty-state i {
  font-size: 3rem;
  color: #2e7d32;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>