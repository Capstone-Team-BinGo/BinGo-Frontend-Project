<template>
  <section class="related-articles">
    <h2 class="related-title">Artikel Terkait</h2>
    <div class="related-list">
      <article
        v-for="article in articles"
        :key="article.id"
        class="related-card"
      >
        <img :src="article.image" :alt="article.title" class="related-image">
        <div class="related-content">
          <h3 class="related-card-title">{{ article.title }}</h3>
          <p class="related-card-excerpt">{{ article.excerpt }}</p>
          <RouterLink
            :to="'/article/' + article.id"
            class="read-more-btn"
          >
            Selengkapnya
          </RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArtikelTerkait',
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.related-articles {
  margin-top: 50px;
}

.related-title {
  font-size: 1.5rem;
  color: #2e7d32;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.related-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.related-card:hover {
  transform: translateY(-5px);
}

.related-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.related-content {
  padding: 20px;
}

.related-card-title {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #2e7d32;
}

.related-card-excerpt {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .related-list {
    grid-template-columns: 1fr;
  }
}
</style>