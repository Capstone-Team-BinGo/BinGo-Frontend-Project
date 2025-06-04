<template>
  <div class="education-app">
    <WasteEducationHeader />
    <div class="app-container">
      <ArticleFilter
        :active-filter="activeFilter"
        @filter-change="updateFilter"
        class="filter-container"
      />
      <ArticleList :articles="filteredArticles" />
    </div>
  </div>
</template>

<script>
import WasteEducationHeader from '../waste/education/list-article/WasteEducationHeader.vue';
import ArticleFilter from '../waste/education/list-article/ArticleFilter.vue';
import ArticleList from '../waste/education/list-article/ArticleList.vue';

export default {
  name: 'WasteEducation',
  components: {
    WasteEducationHeader,
    ArticleFilter,
    ArticleList,
  },
  data() {
    return {
      activeFilter: 'all',
      articles: [
        // Data artikel sama seperti di file edukasi.vue
        {
          id: 1,
          title: 'Pengelolaan Sampah Organik di Rumah Tangga',
          excerpt:
            'Sampah organik seperti sisa makanan dan daun-daunan dapat dikelola dengan cara pengomposan...',
          date: '2023-05-15',
          category: 'organik',
          image:
            'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 2,
          title: 'Mengenal Jenis-jenis Sampah Anorganik',
          excerpt:
            'Sampah anorganik seperti plastik, kaca, dan logam membutuhkan waktu puluhan hingga ratusan tahun untuk terurai. Artikel ini membahas cara mendaur ulang sampah anorganik dengan benar.',
          date: '2023-06-02',
          category: 'anorganik',
          image:
            'https://jubelio-store.s3.ap-southeast-1.amazonaws.com/sustaination/2021/02/13181150/jasmin-sessler-5Wfttm2CjeI-unsplash.jpg',
        },
        {
          id: 3,
          title: 'Bahaya Sampah B3 dan Cara Penanganannya',
          excerpt:
            'Sampah Bahan Berbahaya dan Beracun (B3) seperti baterai, obat kadaluarsa, dan elektronik bekas memerlukan penanganan khusus. Ketahui cara membuang sampah B3 dengan aman di artikel ini.',
          date: '2023-04-20',
          category: 'b3',
          image:
            'https://jubelio-store.s3.ap-southeast-1.amazonaws.com/sustaination/2021/02/13181200/john-cameron-QukrVl1F9Q0-unsplash.jpg',
        },
        {
          id: 4,
          title: 'Teknik Pengomposan Sederhana untuk Pemula',
          excerpt:
            'Ingin memulai pengomposan di rumah? Artikel ini menjelaskan langkah-langkah mudah membuat kompos dari sampah dapur dan kebun menggunakan metode yang sederhana.',
          date: '2023-07-10',
          category: 'organik',
          image:
            'https://jubelio-store.s3.ap-southeast-1.amazonaws.com/sustaination/2021/02/13181153/salome-watel-NbtZL3Nax8E-unsplash.jpg',
        },
        {
          id: 5,
          title: 'Kreativitas Daur Ulang Sampah Plastik',
          excerpt:
            'Sampah plastik bisa diubah menjadi berbagai kerajinan tangan yang bernilai. Temukan ide-ide kreatif untuk mendaur ulang botol plastik dan kemasan bekas di rumah.',
          date: '2023-03-28',
          category: 'anorganik',
          image:
            'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 6,
          title: 'Panduan Membuang Limbah Elektronik dengan Benar',
          excerpt:
            'Limbah elektronik termasuk kategori B3 karena mengandung bahan berbahaya. Pelajari tempat pembuangan khusus dan prosedur yang tepat untuk membuang perangkat elektronik bekas.',
          date: '2023-08-05',
          category: 'b3',
          image:
            'https://jubelio-store.s3.ap-southeast-1.amazonaws.com/sustaination/2021/02/13181200/john-cameron-QukrVl1F9Q0-unsplash.jpg',
        },
        // Artikel lainnya...
      ],
    };
  },
  computed: {
    filteredArticles() {
      if (this.activeFilter === 'all') return this.articles;
      return this.articles.filter(
        (article) => article.category === this.activeFilter
      );
    },
  },
  methods: {
    updateFilter(category) {
      this.activeFilter = category;
    },
  },
};
</script>

<style scoped>
.education-app {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  min-height: 100vh;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.filter-container {
  margin-bottom: 2.5rem;
}

@media (max-width: 768px) {
  .app-container {
    padding: 1.5rem;
  }
}
</style>
