<template>
    <div class="organic-waste-gallery">
      <h2 class="gallery-title">Jenis Sampah Organik</h2>
      <div class="gallery-grid">
        <!-- Card 1 -->
        <div class="waste-card" v-for="(item, index) in organicItems" :key="index">
          <div class="card-image">
            <img :src="item.image" :alt="item.name">
            <div class="image-overlay"></div>
          </div>
          <div class="card-content">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      <RouterLink to="/" class="back-button">
        <i class="fas fa-arrow-left"></i> Kembali
      </RouterLink>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrganicList',
    data() {
      return {
        organicItems: [
          {
            name: 'Sisa Makanan',
            description: 'Nasi, sayuran, buah, dan sisa makanan lainnya',
            image: require('@/assets/organic/sisamakanan.jpeg')
          },
          {
            name: 'Daun & Tanaman',
            description: 'Daun kering, ranting, rumput potong, bunga layu',
            image: require('@/assets/organic/daun.jpeg')
          },
          {
            name: 'Ampas Kopi/Teh',
            description: 'Ampas kopi, teh celup bekas, dan sejenisnya',
            image: require('@/assets/organic/kopi.jpeg')
          },
          {
            name: 'Cangkang Telur',
            description: 'Cangkang telur ayam, bebek, atau telur lainnya',
            image: require('@/assets/organic/telur.jpeg')
          },
          {
            name: 'Tulang Hewan',
            description: 'Tulang ayam, sapi, ikan, dan hewan lainnya',
            image: require('@/assets/organic/tulang.jpg')
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .organic-waste-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .gallery-title {
    color: #10b981;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    position: relative;
  }
  
  .gallery-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #3b82f6);
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .waste-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .waste-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }
  
  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  .waste-card:hover .card-image img {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%);
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-content h3 {
    color: #1e293b;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }
  
  .card-content p {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .back-button {
    display: block;
    margin: 2rem auto 0;
    padding: 0.8rem 2rem;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    width: 6rem;
    margin-left: 3rem;
  }
  
  .back-button:hover {
    background-color: #0d9c6e;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }
  
  .back-button i {
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
    
    .gallery-title {
      font-size: 1.6rem;
    }
    
    .card-image {
      height: 180px;
    }
  }
  </style>