<template>
  <article class="article-detail" v-if="article">
    <img :src="article.image" :alt="article.title" class="article-hero">
    <div class="article-content">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span class="article-category">{{ formatCategory(article.category) }}</span>
        <span class="article-date">Dipublikasikan: {{ formatDate(article.date) }}</span>
      </div>
      <div class="article-body" v-html="article.content"></div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArticleDetail',
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
.article-detail {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.article-hero {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.article-content {
  padding: 40px;
}

.article-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2e7d32;
}

.article-meta {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  color: #666;
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

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
}

.article-body >>> h2 {
  font-size: 1.5rem;
  color: #2e7d32;
  margin: 30px 0 15px;
}

.article-body >>> ul,
.article-body >>> ol {
  margin-left: 20px;
  margin-bottom: 20px;
}

.article-body >>> li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .article-hero {
    height: 250px;
  }

  .article-content {
    padding: 20px;
  }

  .article-title {
    font-size: 1.8rem;
  }
}
</style>