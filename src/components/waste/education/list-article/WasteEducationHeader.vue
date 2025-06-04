<template>
  <div class="education-header">
    <h1>Edukasi Pengelolaan Sampah</h1>
    <p>Temukan artikel bermanfaat tentang pengelolaan sampah yang tepat</p>
  </div>
</template>

<script>
export default {
  name: 'WasteEducationHeader'
};
</script>

<style scoped>
.education-header {
  background-color: #2e7d32;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.education-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .education-header h1 {
    font-size: 2rem;
  }
}
</style>