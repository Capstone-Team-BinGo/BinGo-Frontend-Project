<template>
  <div class="article-page">
    <ArticleHeader />

    <div class="container">
      <RouterLink to="/edukasi" class="back-button">
        Kembali ke Daftar Artikel
      </RouterLink>

      <!-- Loading state -->
      <div v-if="loading" class="loading-state">
        Memuat artikel...
      </div>

      <!-- Error state -->
      <div v-if="error" class="error-state">
        Gagal memuat artikel: {{ error }}
      </div>

      <!-- Success state -->
      <template v-if="currentArticle">
        <ArticleDetail :article="formattedArticle" />
        <ArticleTerkait 
          v-if="relatedArticles.length > 0" 
          :articles="relatedArticles" 
        />
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getDetailArticles, getAllArticles } from '@/data/api'; // Pastikan import dari api.js
import ArticleHeader from '@/components/waste/education/detail-article/ArticleHeader.vue';
import ArticleDetail from '@/components/waste/education/detail-article/ArticleDetail.vue';
import ArticleTerkait from '@/components/waste/education/detail-article/ArticleTerkait.vue';

export default {
  name: 'ArticlePage',
  components: {
    ArticleHeader,
    ArticleDetail,
    ArticleTerkait
  },
  setup() {
    const route = useRoute();
    const currentArticle = ref(null);
    const allArticles = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // Format artikel untuk komponen ArticleDetail
    const formattedArticle = computed(() => {
      if (!currentArticle.value) return null;
      
      return {
        title: currentArticle.value.judul_article,
        content: currentArticle.value.description,
        image: currentArticle.value.image_thumb,
        date: currentArticle.value.created_at,
      };
    });

    // Format artikel terkait
    const relatedArticles = computed(() => {
      if (!currentArticle.value || !allArticles.value.length) return [];
      
      return allArticles.value
        .filter(article => 
          article.article_uid !== currentArticle.value.article_uid && 
          article.judul_article // Pastikan artikel valid
        )
        .slice(0, 3)
        .map(article => ({
          id: article.article_uid, // Pastikan ini article_uid
          title: article.judul_article,
          excerpt: article.description?.substring(0, 100) + '...' || '',
          image: article.image_thumb
        }));
    });

    // Fetch artikel detail
    const fetchArticleDetail = async () => {
      try {
        loading.value = true;
        const response = await getDetailArticles(route.params.article_uid); // Param ID sebenarnya adalah article_uid
        
        if (response.ok) {
          currentArticle.value = response.data;
        } else {
          throw new Error(response.message || 'Gagal memuat artikel');
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    // Fetch semua artikel untuk related articles
    const fetchAllArticles = async () => {
      try {
        const response = await getAllArticles();
        
        if (response.ok) {
          allArticles.value = response.data || [];
        }
      } catch (err) {
        console.error('Gagal memuat artikel terkait:', err);
      }
    };

    onMounted(async () => {
      await Promise.all([fetchArticleDetail(), fetchAllArticles()]);
    });

    // Pantau perubahan pada article_uid di rute
    watch(
      () => route.params.article_uid,
      (newArticleUid) => {
        if (newArticleUid) {
          fetchArticleDetail();
        }
      }
    );

    return {
      currentArticle,
      formattedArticle,
      relatedArticles,
      loading,
      error
    };
  }
};
</script>

<style scoped>
/* Tetap sama dengan sebelumnya */
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

.loading-state {
  padding: 20px;
  text-align: center;
  color: #666;
}

.error-state {
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
}
</style>