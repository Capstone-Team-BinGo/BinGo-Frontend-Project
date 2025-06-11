<template>
  <header class="education-hero">
    <div class="hero-content">
      <h1 class="hero-title">
        <i class="fas fa-leaf"></i> Pusat Edukasi Sampah
      </h1>
      <p class="hero-subtitle">Temukan artikel mengenai pengelolaan sampah yang berkelanjutan</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'WasteEducationHeader'
};
</script>

<style scoped>
.education-hero {
  background-color: white;
  color: #2e7d32;
  text-align: center;
  padding: 1rem 1rem 2rem;
  position: relative;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.hero-title i {
  font-size: 2.5rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.hero-search {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 30px 0 0 30px;
  font-size: 1rem;
}

.search-btn {
  background: #1b5e20;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #134a16;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.hero-wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 100px;
}

@media (max-width: 768px) {
  .education-hero {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title{
    flex-direction: column;
  }
}
</style>