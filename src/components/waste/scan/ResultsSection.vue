<template>
  <transition name="fade-slide">
    <section class="results-section" v-if="analysisResult">
      <h2 class="results-title">Hasil Analisis</h2>

      <div class="result-card" v-if="analysisResult">
        <div class="waste-icon">
          <i :class="getWasteIcon(analysisResult.itemName)"></i>
        </div>

        <h4 class="waste-name">{{ analysisResult.itemName }}</h4>

        <div class="waste-category">
          <span class="category-badge">{{ analysisResult.type }}</span>
        </div>

        <p class="waste-description">{{ analysisResult.description }}</p>

        <div class="disposal-info" v-if="analysisResult.disposalSteps?.length">
          <h4 class="disposal-title">
            <i class="fas fa-trash-alt"></i> Cara Pembuangan yang Tepat:
          </h4>

          <ul class="disposal-steps">
            <li
              v-for="(step, index) in analysisResult.disposalSteps"
              :key="index"
            >
              <i class="fas fa-check-circle"></i> {{ step }}
            </li>
          </ul>
        </div>

        <div v-else class="disposal-info">
          <p>
            <i class="fas fa-info-circle"></i> Informasi pembuangan tidak
            tersedia
          </p>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: {
    analysisResult: {
      type: Object,

      default: null,
    },
  },
  methods: {
    getWasteIcon(wasteType) {
      const iconMap = {
        Baterai: "fas fa-battery-half",
        Daun: "fas fa-leaf",
        Elektronik: "fas fa-mobile-alt",
        Kaca: "fas fa-wine-glass",
        Kardus: "fas fa-box",
        Kertas: "fas fa-file-alt",
        Lampu: "fas fa-lightbulb",
        Logam: "fas fa-coins",
        Pakaian: "fas fa-tshirt",
        Plastik: "fas fa-bottle-water",
        "Sampah Makanan": "fas fa-apple-alt",
        Sterofom: "fas fa-cube",
      };
      return iconMap[wasteType] || "fas fa-trash";
    },
  },
};
</script>

<style scoped>
.results-section {
  background-color: white;

  border-radius: 16px;

  padding: 2.5rem;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

  margin-bottom: 2rem;

  border: 1px solid rgba(46, 125, 50, 0.1);

  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-title {
  margin-bottom: 1.5rem;

  color: #2e7d32;

  text-align: center;

  font-size: 1.8rem;

  font-weight: 600;
}

.result-card {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 1rem;
}

.waste-icon {
  font-size: 4rem;

  margin-bottom: 0;

  color: #4caf50;
}

.waste-name {
  font-size: 2rem;

  font-weight: 700;

  color: #333;

  margin-bottom: 0;

  text-align: center;

  margin-top: 0;
}

.waste-category {
  margin: 10px auto;
}

.category-badge {
  background: linear-gradient(135deg, #4caf50, #2e7d32);

  color: white;

  padding: 0.5rem 1.5rem;

  border-radius: 50px;

  font-size: 1rem;

  font-weight: 600;

  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.2);
}

.waste-description {
  text-align: center;

  max-width: 700px;

  margin-bottom: 0;

  color: #555;

  font-size: 1.1rem;

  line-height: 1.6;
}

.disposal-info {
  background-color: #f9f9f9;

  padding: 1.5rem;

  border-radius: 12px;

  width: 100%;

  max-width: 700px;

  border: 1px solid rgba(0, 0, 0, 0.05);
}

.disposal-title {
  font-weight: 600;

  margin-bottom: 1rem;

  color: #333;

  font-size: 1.3rem;

  display: flex;

  align-items: center;

  gap: 0.5rem;
}

.disposal-title i {
  color: #4caf50;
}

.disposal-steps {
  list-style-type: none;

  padding-left: 0;
}

.disposal-steps li {
  margin-bottom: 0.8rem;

  padding-left: 0;

  display: flex;

  align-items: flex-start;

  gap: 0.7rem;

  line-height: 1.5;
}

.disposal-steps li i {
  color: #4caf50;

  margin-top: 0.2rem;

  flex-shrink: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;

  transform: translateY(20px);
}

@media (max-width: 768px) {
  .results-section {
    padding: 1.5rem;
  }

  .waste-name {
    font-size: 1.5rem;
  }

  .waste-description {
    font-size: 1rem;
  }
}
</style>
