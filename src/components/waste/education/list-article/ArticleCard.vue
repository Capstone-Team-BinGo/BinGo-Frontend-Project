<template>
  <article class="article-card">
    <img :src="article.image" :alt="article.title" class="article-image">
    <div class="article-content">
      <span class="article-category">{{ formatCategory(article.category) }}</span>
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-date">Dipublikasikan: {{ formatDate(article.date) }}</p>
      <RouterLink :to="'/article/' + article.id" class="read-more-btn">
        Selengkapnya
      </RouterLink>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    formatCategory(category) {
      const categories = {
        'organik': 'Organik',
        'anorganik': 'Anorganik',
        'b3': 'B3'
      };
      return categories[category] || category;
    }
  }
};
</script>

<style scoped>
.article-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.article-content {
  padding: 20px;
}

.article-category {
  display: inline-block;
  padding: 4px 12px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 15px;
}

.article-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #2e7d32;
}

.article-excerpt {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.95rem;
}

.article-date {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 15px;
}

.read-more-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #2e7d32;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.read-more-btn:hover {
  background-color: #1b5e20;
}
</style>