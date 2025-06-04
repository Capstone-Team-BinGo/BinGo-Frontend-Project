<template>
  <section class="articles-list">
    <div v-if="articles.length === 0" class="no-articles">
      <p>Tidak ada artikel yang ditemukan untuk kategori ini.</p>
    </div>
    <ArticleCard
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
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
    }
  }
};
</script>

<style scoped>
.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.no-articles {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #666;
}

@media (max-width: 768px) {
  .articles-list {
    grid-template-columns: 1fr;
  }
}
</style>