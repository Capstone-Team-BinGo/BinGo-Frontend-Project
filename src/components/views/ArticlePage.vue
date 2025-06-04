<template>
  <div class="article-page">
    <ArticleHeader />

    <div class="container">
      <RouterLink to="/edukasi" class="back-button">
        Kembali ke Daftar Artikel
      </RouterLink>

      <ArticleDetail :article="currentArticle" />

      <ArticleTerkait
        v-if="relatedArticles.length > 0"
        :articles="relatedArticles"
      />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import ArticleHeader from '@/components/waste/education/detail-article/ArticleHeader.vue';
import ArticleDetail from '@/components/waste/education/detail-article/ArticleDetail.vue';
import ArticleTerkait from '@/components/waste/education/detail-article/ArticleTerkait.vue';
import articleData from '@/data/articleData.js';

export default {
  name: 'ArticlePage',
  components: {
    ArticleHeader,
    ArticleDetail,
    ArticleTerkait
  },
  setup() {
    const route = useRoute();
    const articleId = parseInt(route.params.id);

    const currentArticle = articleData.find(article => article.id === articleId);
    const relatedArticles = articleData
      .filter(article =>
        article.id !== articleId &&
        article.category === currentArticle?.category
      )
      .slice(0, 3);

    return {
      currentArticle,
      relatedArticles
    };
  }
};
</script>

<style scoped>
.article-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #2e7d32;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #1b5e20;
}
</style>