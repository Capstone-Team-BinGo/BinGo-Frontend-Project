<template>
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <div class="text-content">
            <h1 class="title">B<span class="green-i">i</span>NGO !</h1>
            <p>
              Platform edukasi pengelolaan sampah interaktif yang mengubah kebiasaan masyarakat menuju lingkungan berkelanjutan.
            </p>
            <a href="#facts" class="read-more">Selengkapnya</a>
            <button class="read-more" @click="$emit('open-login')">
      Mulai Jelajahi
    </button>
          </div>
          <div class="image-content">
            <img src="@/assets/sampah-2.jpg" alt="Recycle Illustration" />
          </div>
        </div>
      </section>

      <section class="facts-section enhanced" id="facts">
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
          <span>Sampah Yang Didaur Ulang</span>
        </div>
      </div>
      <router-link to="/about"  class="facts-link">Semua Tentang Kami di sini  <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></router-link>
    </div>
    <div class="facts-image">
      <img src="@/assets/sampah.png" alt="Ilustrasi daur ulang" />
    </div>
  </div>
</section>

<section class="waste-types">
  <h2 class="section-title">Jenis-Jenis Sampah</h2>
  <p class="section-subtitle">Kenali berbagai jenis sampah dan cara penanganannya yang tepat</p>
  
  <div class="waste-cards">
    <!-- Organic Card -->
    <div class="waste-card organic">
      <div class="card-front">
        <div class="card-icon">
          <i class="fas fa-leaf"></i>
        </div>
        <h3 class="card-title">Organik</h3>
        <div class="card-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="card-back">
        <div class="card-content">
          <h3 class="card-title">Sampah Organik</h3>
          <p class="card-desc">Sampah yang berasal dari bahan-bahan alami dan dapat terurai secara alami oleh mikroorganisme, seperti sisa makanan dan daun-daunan.</p>
          <RouterLink to="/organic" class="card-button">
            Pelajari Lebih Lanjut
            <i class="fas fa-arrow-right"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <!-- Anorganic Card -->
    <div class="waste-card anorganic">
      <div class="card-front">
        <div class="card-icon">
          <i class="fas fa-recycle"></i>
        </div>
        <h3 class="card-title">Anorganik</h3>
        <div class="card-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="card-back">
        <div class="card-content">
          <h3 class="card-title">Sampah Anorganik</h3>
          <p class="card-desc">Sampah yang tidak berasal dari makhluk hidup dan sulit terurai secara alami, seperti plastik, kaca, dan logam.</p>
          <RouterLink to="/anorganic" class="card-button">
            Pelajari Lebih Lanjut
            <i class="fas fa-arrow-right"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <!-- B3 Card -->
    <div class="waste-card b3">
      <div class="card-front">
        <div class="card-icon">
          <i class="fas fa-biohazard"></i>
        </div>
        <h3 class="card-title">B3</h3>
        <div class="card-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="card-back">
        <div class="card-content">
          <h3 class="card-title">Sampah B3</h3>
          <p class="card-desc">Limbah yang mengandung zat kimia berbahaya dan beracun yang dapat merusak kesehatan dan lingkungan.</p>
          <RouterLink to="/b3" class="card-button">
            Pelajari Lebih Lanjut
            <i class="fas fa-arrow-right"></i>
          </RouterLink>
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
  .hero {
    background: #ffffff;
    padding: 80px 20px;
    position: relative;
    overflow: hidden;
  }
  
  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(181,216,194,0.1) 0%, rgba(181,216,194,0) 70%);
  }
  
  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    position: relative;
    z-index: 1;
  }
  
  @media (min-width: 992px) {
    .hero-content {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
  
  .text-content {
    max-width: 600px;
    text-align: center;
  }
  
  @media (min-width: 992px) {
    .text-content {
      text-align: left;
    }
  }
  
  .title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    margin-bottom: 24px;
    color: #082e16;
    line-height: 1.2;
    letter-spacing: -0.5px;
  }
  
  .green-i {
    color: #B5D8C2;
    text-shadow: 0 0 10px rgba(181, 216, 194, 0.5);
  }
  
  .text-content p {
    font-size: 1.1rem;
    margin-bottom: 32px;
    color: #000000;
    line-height: 1.7;
  }
  
  .read-more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: #082e16;
    border: 2px solid #082e16;
    padding: 12px 32px;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }
  
  .read-more::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #082e16;
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
  }
  
  .read-more:hover {
    color: #ffffff;
    border-color: transparent;
  }
  
  .read-more:hover::before {
    transform: translateX(0);
  }
  
  .image-content {
    position: relative;
    max-width: 550px;
    width: 100%;
  }
  
  .image-content img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }
  
  .image-content:hover img {
    transform: perspective(1000px) rotateY(0) rotateX(0);
    box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.3);
  }
  
  /* Facts Section - Modern Card */
  .facts-section.enhanced {
    background: white;
    padding: 100px 20px;
    position: relative;
  }
  
  .facts-section.enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 30L70 70M70 30L30 70" stroke="%23f0f0f0" stroke-width="0.5"/></svg>');
    opacity: 0.1;
  }
  
  .facts-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 60px;
    position: relative;
    z-index: 1;
  }
  
  @media (min-width: 992px) {
    .facts-container {
      flex-direction: row;
      align-items: center;
    }
  }
  
  .facts-text {
    flex: 1;
  }
  
  .facts-title {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #082E16;
    margin-bottom: 24px;
    line-height: 1.3;
    position: relative;
    display: inline-block;
  }
  
  .facts-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #42835A, #B5D8C2);
    border-radius: 2px;
  }
  
  .facts-text p {
    font-size: 1.1rem;
    color: #4B5563;
    margin-bottom: 32px;
    line-height: 1.7;
  }
  
  .facts-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .fact-item {
    background: linear-gradient(135deg, #42835A 0%, #5CA375 100%);
    color: white;
    padding: 24px 20px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 10px 20px rgba(66, 131, 90, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .fact-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(66, 131, 90, 0.3);
  }
  
  .fact-item strong {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 8px;
    font-weight: 700;
  }
  
  .fact-item span {
    font-size: 0.95rem;
    opacity: 0.9;
  }
  
  .facts-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #42835A;
    font-weight: 600;
    text-decoration: none;
    font-size: 1.05rem;
    transition: all 0.3s ease;
    padding: 8px 0;
    position: relative;
  }
  
  .facts-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #42835A;
    transition: width 0.3s ease;
  }
  
  .facts-link:hover {
    color: #2E5C3F;
  }
  
  .facts-link:hover::after {
    width: 100%;
  }
  
  .facts-link i {
    transition: transform 0.3s ease;
  }
  
  .facts-link:hover i {
    transform: translateX(6px);
  }
  
  .facts-image {
    flex: 1;
    position: relative;
  }
  
  .facts-image img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    transition: transform 0.5s ease;
  }
  
  .facts-image:hover img {
    transform: scale(1.02);
  }
  
  /* Waste Types Section - Modern 3D Cards */
  .waste-types {
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 20px;
    text-align: center;
    position: relative;
  }
  
  .section-title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    color: #082E16;
    margin-bottom: 16px;
    position: relative;
    display: inline-block;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #42835A, #B5D8C2);
    border-radius: 2px;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    color: #6B7280;
    margin-bottom: 60px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
  }
  
  .waste-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    padding: 0 20px;
  }
  
  .waste-card {
    height: 380px;
    perspective: 1500px;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.6s ease, box-shadow 0.6s ease;
  }
  
  .waste-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  }
  
  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 30px;
    box-sizing: border-box;
    background: white;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  .card-front {
    transform: rotateY(0deg);
  }
  
  .waste-card:hover .card-front {
    transform: rotateY(180deg);
  }
  
  .card-back {
    transform: rotateY(-180deg);
  }
  
  .waste-card:hover .card-back {
    transform: rotateY(0deg);
  }
  
  .card-icon {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    font-size: 2.8rem;
    transition: all 0.5s ease;
  }
  
  .waste-card:hover .card-icon {
    transform: scale(0.9) translateY(-10px);
  }
  
  .card-title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .card-dots {
    display: flex;
    gap: 8px;
    margin-top: 24px;
  }
  
  .card-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0.3;
    transition: all 0.3s ease;
  }
  
  .waste-card:hover .card-dots span {
    opacity: 0.7;
    transform: translateY(-5px);
  }
  
  .card-dots span:nth-child(1) { transition-delay: 0.1s; }
  .card-dots span:nth-child(2) { transition-delay: 0.2s; }
  .card-dots span:nth-child(3) { transition-delay: 0.3s; }
  
  .card-desc {
    color: #4B5563;
    line-height: 1.7;
    margin-bottom: 32px;
    text-align: center;
    font-size: 1rem;
  }
  
  .card-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .card-button i {
    transition: transform 0.3s ease;
  }
  
  .card-button:hover i {
    transform: translateX(5px);
  }
  
  /* Card Color Themes */
  .organic {
    color: #42835A;
  }
  
  .organic .card-icon {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.2) 100%);
  }
  
  .organic .card-button {
    background: #42835A;
    color: white;
  }
  
  .anorganic {
    color: #42835A;
  }
  
  .anorganic .card-icon {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.2) 100%);
  }
  
  .anorganic .card-button {
    background: #42835A;
    color: white;
  }
  
  .b3 {
    color: #42835A;
  }
  
  .b3 .card-icon {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.2) 100%);
  }
  
  .b3 .card-button {
    background: #42835A;
    color: white;
  }
  
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero {
      padding: 60px 20px;
    }
    
    .waste-types {
      padding: 60px 20px;
    }
    
    .facts-section.enhanced {
      padding: 60px 20px;
    }
    
    .waste-cards {
      grid-template-columns: 1fr;
      max-width: 500px;
      margin: 0 auto;
    }
  }
  
  @media (max-width: 480px) {
    .title {
      font-size: 2.2rem;
    }
    
    .text-content p {
      font-size: 1rem;
    }
    
    .facts-stats {
      grid-template-columns: 1fr;
    }
    
    .section-title {
      font-size: 1.8rem;
    }
    
    .section-subtitle {
      font-size: 1rem;
    }
    
    .waste-card {
      height: 340px;
    }
  }
  </style>
  