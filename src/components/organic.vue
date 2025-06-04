<template>
  <div class="organic-waste-gallery">
    <h2 class="gallery-title">Jenis Sampah Organik</h2>
    <p class="gallery-subtitle">Pelajari berbagai jenis sampah organik yang dapat didaur ulang</p>
    
    <div class="gallery-grid">
      <div class="waste-card" v-for="(item, index) in organicItems" :key="index">
        <div class="card-image">
          <img :src="item.image" :alt="item.name">
          <div class="image-overlay"></div>
          <span class="card-badge">Organik</span>
        </div>
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <div class="card-footer">
          </div>
        </div>
      </div>
    </div>
    
    <RouterLink to="/" class="back-button">
      <i class="fas fa-arrow-left"></i> Kembali ke Beranda
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
          description: 'Nasi, sayuran, buah, dan sisa makanan lainnya yang dapat dikomposkan',
          image: require('@/assets/organic/sisamakanan.jpeg')
        },
        {
          name: 'Daun & Tanaman',
          description: 'Daun kering, ranting, rumput potong, bunga layu untuk kompos',
          image: require('@/assets/organic/daun.jpeg')
        },
        {
          name: 'Ampas Kopi/Teh',
          description: 'Ampas kopi, teh celup bekas yang kaya nutrisi untuk tanaman',
          image: require('@/assets/organic/kopi.jpeg')
        },
        {
          name: 'Cangkang Telur',
          description: 'Cangkang telur ayam, bebek yang mengandung kalsium tinggi',
          image: require('@/assets/organic/telur.jpeg')
        },
        {
          name: 'Tulang Hewan',
          description: 'Tulang ayam, sapi, ikan yang perlu pengolahan khusus',
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
  padding: 3rem 2rem;
}

.gallery-title {
  color: #082E16;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
}

.gallery-subtitle {
  color: #4B5563;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.gallery-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #10B981, #065F46);
  margin: 1rem auto 0;
  border-radius: 2px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.waste-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.waste-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.waste-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(8, 46, 22, 0.7), transparent 60%);
}

.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #065F46;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  color: #082E16;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-content p {
  color: #4B5563;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-footer {
  margin-top: auto;
}

.detail-button {
  background-color: #065F46;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
}

.detail-button:hover {
  background-color: #064E3B;
  transform: translateY(-2px);
}

.back-button {
  display: inline-flex;
  align-items: center;
  margin: 2rem auto 0;
  padding: 0.8rem 2rem;
  background-color: #065F46;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(6, 95, 70, 0.1);
}

.back-button:hover {
  background-color: #064E3B;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(6, 95, 70, 0.15);
}

.back-button i {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .organic-waste-gallery {
    padding: 2rem 1.5rem;
  }
  
  .gallery-title {
    font-size: 2rem;
  }
  
  .gallery-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .card-image {
    height: 200px;
  }
}
</style>