<template>
  <section class="results-section" v-if="analysisResult">
    <h2 class="results-title">Hasil Analisis</h2>
    <div class="result-card" v-if="analysisResult">
      <div class="waste-icon">
        <i :class="analysisResult.wasteIcon"></i>
      </div>
      <h3 class="waste-name">{{ analysisResult.itemName }}</h3>
      <div class="waste-category">
        <span class="category-badge">{{ analysisResult.type }}</span>
      </div>
      <p class="waste-description">{{ analysisResult.description }}</p>

      <div class="disposal-info" v-if="analysisResult.disposalSteps?.length">
        <h4 class="disposal-title"><strong>Cara Pembuangan yang Tepat:</strong></h4>
        <ul class="disposal-steps">
          <li v-for="(step, index) in analysisResult.disposalSteps" :key="index">
            {{ step }}
          </li>
        </ul>
      </div>
      <div v-else class="disposal-info">
        <p>Informasi pembuangan tidak tersedia</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    analysisResult: {
      type: Object,
      default: null
    }
  }
};
</script>

<style scoped>
/* Tetap sama dengan style results section sebelumnya */
/* Results Section */
.results-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  /*display: none;*/
}

.results-title {
  margin-bottom: 20px;
  color: #2e7d32;
  text-align: center;
}

.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.waste-name {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.waste-category {
  margin-bottom: 15px;
}

.category-badge {
  background-color: #4CAF50;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
}

.waste-icon {
  font-size: 60px;
  margin-bottom: 15px;
}

.waste-description {
  text-align: center;
  max-width: 600px;
  margin-bottom: 20px;
  color: #555;
}

.disposal-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
}

.disposal-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.disposal-steps {
  list-style-type: none;
}

.disposal-steps li {
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.disposal-steps li:before {
  content: '•';
  color: #4caf50;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: -3px;
}
</style>