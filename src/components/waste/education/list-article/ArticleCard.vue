<template>
  <article class="article-card" @click="navigateToArticle">
    <div class="card-image">
      <img :src="article.image" :alt="article.title" class="article-image" />
    </div>
    <div class="card-content">
      <div class="card-meta">
        <span class="card-date">
          <i class="far fa-calendar-alt"></i>
          {{ formatDate(article.date) }}
        </span>
      </div>
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-excerpt">{{ stripHtml(article.excerpt) }}</p>
      <div class="card-footer">
        <button class="read-more-btn">
          Selengkapnya <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    navigateToArticle() {
      this.$router.push('/article/' + this.article.id);
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
};
</script>

<style scoped>
.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
}

.card-date {
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.card-date i {
  font-size: 0.7rem;
}

.card-title {
  font-size: 1.3rem;
  margin: 0 0 1rem;
  color: #333;
  line-height: 1.4;
}

.card-excerpt {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.card-footer {
  margin-top: auto;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background: #1b5e20;
  transform: translateX(5px);
}

.read-more-btn i {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.read-more-btn:hover i {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }

  .card-content {
    padding: 1.25rem;
  }

  .card-title {
    font-size: 1.2rem;
  }
}
</style>
