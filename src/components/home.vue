<template>
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="text-content">
            <h1 class="title">B<span class="green-i">i</span>NGO !</h1>
            <p>
              Platform Edukasi Pengelolaan Sampah dan Belajar Memilah Sampah Dengan Cara Yang Seru.
            </p>
            <button class="read-more">LEARN MORE</button>
          </div>
          <div class="image-content">
            <img src="@/assets/Recycle.jpeg" alt="Recycle Illustration" />
          </div>
        </div>
      </section>

      <section class="facts-section enhanced">
  <div class="facts-container">
    <div class="facts-text">
      <h2 class="facts-title">Indonesia dan Tantangan Sampah, Apa yang Harus Kita Tahu?</h2>
      <p>
        Indonesia menghadapi tantangan serius dalam pengelolaan sampah, 
        Penting bagi masyarakat untuk memahami dampaknya terhadap lingkungan 
        dan berperan aktif dalam solusi, 
        seperti pengurangan, pemilahan, dan daur ulang sampah.
      </p>
      <div class="facts-stats">
        <div class="fact-item">
          <strong>69,7 Juta</strong>
          <span>Ton Sampah Pertahun</span>
        </div>
        <div class="fact-item">
          <strong>60%</strong>
          <span>Komposisi Sampah Organik</span>
        </div>
        <div class="fact-item">
          <strong>15%</strong>
          <span>Sampah Yang DIdaur ulang</span>
        </div>
      </div>
      <a href="#" class="facts-link">Semua Tentang Kami di sini  <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
    </div>
    <div class="facts-image">
      <img src="@/assets/sampah.png" alt="Ilustrasi daur ulang" />
    </div>
  </div>
</section>

<section class="card-container">
  <h2 class="section-title">Jenis-Jenis Sampah</h2>
  <div class="card-wrapper">
    <div class="card organik">
      <div class="card-content">
        <div class="icon">
          <i class="fas fa-leaf"></i>
        </div>
        <h3>Organik</h3>
        <div class="card-overlay">
          <div class="overlay-content">
            <p>Sampah organik adalah jenis sampah yang berasal dari 
              bahan-bahan alami atau makhluk hidup dan dapat terurai secara alami oleh mikroorganisme.</p>
            <RouterLink to="/organic" class="overlay-button">
              <span>Selengkapnya</span>
              <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="card anorganik">
      <div class="card-content">
        <div class="icon">
          <i class="fas fa-recycle"></i>
        </div>
        <h3>Anorganik</h3>
        <div class="card-overlay">
          <div class="overlay-content">
            <p>Sampah anorganik adalah jenis sampah yang tidak berasal 
                dari makhluk hidup dan sulit atau tidak bisa terurai secara alami oleh mikroorganisme. </p>
                <RouterLink to="/anorganic" class="overlay-button">
              <span>Selengkapnya</span>
              <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="card b3">
      <div class="card-content">
        <div class="icon">
          <i class="fas fa-biohazard"></i>
        </div>
        <h3>B3</h3>
        <div class="card-overlay">
          <div class="overlay-content">
            <p>Sampah B3 adalah limbah yang mengandung zat kimia berbahaya dan beracun yang 
              dapat merusak kesehatan dan lingkungan jika tidak ditangani dengan benar.</p>
              <RouterLink to="/b3" class="overlay-button">
              <span>Selengkapnya</span>
              <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeContent"
  };
  </script>
  
  <style scoped>
  /* Hero Section */
.hero {
  background-color: #082e16;
  padding: 67px 20px;
}

.hero-content {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

@media (min-width: 768px) {
  .hero-content {
    flex-direction: row;
    text-align: left;
  }
}

.title {
  font-size: 2.75rem;
  margin-bottom: 20px;
  font-weight: 700;
  color: #ffffff;
}

.green-i {
  color: #DDEB9D;
}


.text-content {
  max-width: 500px;
  text-align: center;
}

@media (min-width: 768px) {
  .text-content {
    text-align: left;
  }
}

.text-content h1 {
  font-size: 2.75rem; /* lebih fleksibel di berbagai layar */
  margin-bottom: 20px;
}

.bold {
  font-weight: 700;
  color: #000000;
}

.text-content p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #ffffff; /* abu yang lembut */
  line-height: 1.6;
}

.read-more {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px 24px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.read-more:hover {
  background-color: #ffffff;
  border: 2px solid #ffffff;
  color: #082e16;
}

.image-content img {
  max-width: 550px;
  height: auto;
  border-radius: 16px;
}

.facts-section.enhanced {
  background-color: #ffffff;
  padding: 60px 20px;
}

.facts-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

@media (min-width: 768px) {
  .facts-container {
    flex-direction: row;
  }
}

.facts-text {
  flex: 1;
}

.facts-text .facts-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
}

.facts-text p {
  font-size: 1rem;
  color: #374151;
  margin-bottom: 30px;
  line-height: 1.6;
}

.facts-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.fact-item {
  background-color: #16a34a;
  color: #ffffff;
  padding: 16px 20px;
  border-radius: 12px;
  flex: 1;
  min-width: 140px;
  text-align: center;
}

.fact-item strong {
  display: block;
  font-size: 1.5rem;
  margin-bottom: 6px;
}

.fact-item span {
  font-size: 0.95rem;
}

.facts-link {
  display: inline-block;
  margin-top: 12px;
  color: #16a34a;
  font-weight: bold;
  text-decoration: none;
}

.facts-link i {
  transition: transform 0.3s ease;
}

.facts-link:hover i {
  transform: translateX(6px);
}

.facts-image img {
  max-width: 500px;
  width: 100%;
  height: auto;
  border-radius: 12px;
}


/* Category Cards Section */
/* Modern Card Styles */
.card-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #2d3748;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
  margin: 1rem auto 0;
  border-radius: 2px;
}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  position: relative;
  background: white;
  height: 300px;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.card:hover .icon {
  transform: scale(1.1);
}

.card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  position: relative;
}

.card h3::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: currentColor;
  margin: 0.75rem auto 0;
  border-radius: 3px;
  opacity: 0.7;
  transition: width 0.3s ease;
}

.card:hover h3::after {
  width: 60px;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.98) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  box-sizing: border-box;
  overflow: hidden;
}

.card:hover .card-overlay {
  opacity: 1;
  transform: translateY(0);
}

.overlay-content {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 0.5rem;
  text-align: center;
  transform: translateY(20px);
  transition: transform 0.4s ease 0.1s;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;
}

.overlay-content::-webkit-scrollbar {
  width: 6px;
}

.overlay-content::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}

.card:hover .overlay-content {
  transform: translateY(0);
}

.overlay-content p {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  padding: 0 0.5rem;
}

@media (max-width: 480px) {
  .overlay-content p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.overlay-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: currentColor;
  border: 2px solid currentColor;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.overlay-button:hover {
  transform: translateY(-4px);
}

.overlay-button i {
  transition: transform 0.3s ease;
}

.overlay-button:hover i {
  transform: translateX(3px);
}

/* Card Colors */
.organik {
  color: #10b981;
}

.anorganik {
  color: #3b82f6;
}

.b3 {
  color: #ef4444;
}

/* Responsive */
@media (max-width: 768px) {
  .card-wrapper {
    grid-template-columns: 1fr;
  }
  
  .card {
    height: 260px;
  }
}
  </style>
  