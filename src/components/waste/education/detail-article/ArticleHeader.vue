<template>
  <header class="article-header">
    <div class="container">
      <h1>Edukasi Pengelolaan Sampah</h1>
      <p>Detail artikel tentang pengelolaan sampah yang tepat</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ArticleHeader'
};
</script>

<style scoped>
.article-header {
  background-color: #2e7d32;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.article-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 2rem;
  }
}
</style>