<template>
  <div class="education-app">
    <WasteEducationHeader />
    <div class="app-container">
      <ArticleList :articles="articles" :isLoading="isLoading" :error="error" />
    </div>
  </div>
</template>

<script>
import WasteEducationHeader from '../waste/education/list-article/WasteEducationHeader.vue';
import ArticleList from '../waste/education/list-article/ArticleList.vue';
import { getAllArticles } from '@/data/api';

export default {
  name: 'WasteEducation',
  components: {
    WasteEducationHeader,
    ArticleList,
  },
  data() {
    return {
      articles: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchArticles() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await getAllArticles();
        if (response.ok) {
          this.articles = response.data.map((article) => ({
            id: article.article_uid,
            title: article.judul_article.trim(),
            excerpt: this.getFirstSentence(article.description),
            date: article.created_at,
            image: article.image_thumb.trim(),
          }));
        } else {
          throw new Error(response.message || 'Failed to fetch articles');
        }
      } catch (err) {
        this.error = err.message;
        console.error('Error fetching articles:', err);
      } finally {
        this.isLoading = false;
      }
    },
    stripHtml(html) {
      // Membuat elemen div sementara untuk menampung konten HTML
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      // Mengambil teks saja tanpa tag HTML
      return tmp.textContent || tmp.innerText || '';
    },

    getFirstSentence(description) {
      // Bersihkan dulu dari tag HTML
      const cleanText = this.stripHtml(description);
      // Get first sentence or first 100 characters
      const firstSentence = cleanText.split('.')[0];
      return firstSentence.length > 100
        ? `${firstSentence.substring(0, 100)}...`
        : firstSentence;
    },
  },
  created() {
    this.fetchArticles();
  },
};
</script>

<style scoped>
.education-app {
  min-height: 100vh;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .app-container {
    padding: 1.5rem;
  }
}
</style>
