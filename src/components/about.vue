<template>
    <div class="about-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title" :class="{ 'animate__animated animate__fadeInDown': animate }">
            Mengubah Perspektif <span class="text-gradient">Tentang Sampah</span>
          </h1>
          <p class="hero-description" :class="{ 'animate__animated animate__fadeInUp': animate }">
            Platform edukasi pengelolaan sampah interaktif yang mengubah kebiasaan masyarakat menuju lingkungan berkelanjutan.
          </p>
        </div>
        <div class="hero-image" :class="{ 'animate__animated animate__fadeIn': animate }">
          <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Waste Education">
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="section-header">
          <h2 class="section-title" :class="{ 'animate__animated animate__fadeIn': animate }">
            <span class="section-title-decor"></span> Fitur Inovatif
          </h2>
          <p class="section-subtitle" :class="{ 'animate__animated animate__fadeIn': animate }">
            Solusi digital untuk manajemen sampah yang lebih cerdas
          </p>
        </div>

        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card"
            :class="{ 'animate__animated animate__fadeIn': animate }"
            :style="`animation-delay: ${index * 0.1}s`"
          >
            <div class="feature-icon" :style="{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.secondaryColor} 100%)` }">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <div class="feature-hover"></div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section">
        <div class="section-header">
          <h2 class="section-title" :class="{ 'animate__animated animate__fadeIn': animate }">
            <span class="section-title-decor"></span> Tim Kami
          </h2>
          <p class="section-subtitle" :class="{ 'animate__animated animate__fadeIn': animate }">
            Anggota Tim CC25-CF232
          </p>
        </div>

        <div class="team-grid">
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="member-card"
            :data-index="index"
            :class="[
              animate && visibleMembers[index] ? 'animate__animated animate__fadeInUp' : '',
              animate && !visibleMembers[index] ? 'animate__animated animate__fadeOutDown' : ''
            ]"
            :style="`animation-delay: ${index * 0.15}s`"
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = null"
          >
            <div class="member-image-container">
              <img
                :src="member.image"
                :alt="member.name"
                :class="{ 'zoomed': hoverIndex === index }"
              />
              <div class="social-links" v-show="hoverIndex === index">
                <a v-for="(link, platform) in member.social" :key="platform" :href="link">
                  <i :class="`fab fa-${platform}`"></i>
                </a>
              </div>
            </div>
            <h3>{{ member.name }}</h3>
            <p class="role">{{ member.role }}</p>
            <p class="bio">{{ member.bio }}</p>
            <div class="member-hover"></div>
          </div>
        </div>
      </section>
    </div>
  </template>

  <script>
  export default {
    name: 'AboutPage',
    data() {
      return {
        animate: false,
        hoverIndex: null,
        visibleMembers: [],
        features: [
          {
            icon: 'fas fa-recycle',
            title: 'Panduan Daur Ulang',
            description: 'Pelajari cara memilah dan mendaur ulang berbagai jenis sampah dengan panduan interaktif',
            color: '#10B981',
            secondaryColor: '#34D399'
          },
          {
            icon: 'fas fa-camera',
            title: 'Klasifikasi Cerdas',
            description: 'Identifikasi jenis sampah secara instan dengan teknologi pemindaian canggih',
            color: '#3B82F6',
            secondaryColor: '#93C5FD'
          },
          {
            icon: 'fas fa-trash-alt',
            title: 'Jenis Sampah',
            description: 'Kenali berbagai jenis sampah dan cara penanganannya',
            color: '#F59E0B',
            secondaryColor: '#FCD34D'
          },
        ],
        teamMembers: [
          {
            name: 'Tiara Fitri Adani',
            role: 'Machine Learning',
            bio: 'Universitas Sebelas Maret',
            image: require ('@/assets/tiara.jpg'),
            social: {
              linkedin: 'https://www.linkedin.com/in/tiarafitriadani/',
            }
          },
          {
            name: 'Kayla Argya Puruhita',
            role: 'Machine Learning',
            bio: 'Universitas Sebelas Maret',
            image: require ('@/assets/kayla.jpg'),
            social: {
              linkedin: 'https://www.linkedin.com/in/kayla-argya-puruhita-b132aa248/'
            }
          },
          {
            name: 'Dyana Gita Pratiwi',
            role: 'Machine Learning',
            bio: 'Universitas Sebelas Maret',
            image: require ('@/assets/gita.jpg'),
            social: {
              linkedin: 'https://www.linkedin.com/in/dyanagita'
            }
          },
                    {
            name: 'Afrian Viky Widyantono',
            role: 'Front-End & Back-End Developer',
            bio: 'Tiga Serangkai University',
            image: require ('@/assets/viky.jpg'),
            social: {
              linkedin: 'https://www.linkedin.com/in/afrian-viky-widyantono/'
            }
          },
                    {
            name: 'Ayub Dwi Wicaksono',
            role: 'Front-End & Back-End Developer',
            bio: 'Tiga Serangkai University',
            image: require ('@/assets/ayub.jpeg'),
            social: {
              linkedin: 'https://www.linkedin.com/in/ayub-dwi-wicaksono-a4b63a351/'
            }
          },
                    {
            name: 'Rizky Budiarto',
            role: 'Front-End & Back-End Developer',
            bio: 'Tiga Serangkai University',
            image: require ('@/assets/risky.jpeg'),
            social: {
              linkedin: '#'
            }
          },
        ]
      };
    },
    mounted() {
      this.animate = true;
      this.visibleMembers = new Array(this.teamMembers.length).fill(false);
      this.observeMembers();
    },
    methods: {
      observeMembers() {
        const options = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const index = Number(entry.target.getAttribute('data-index'));
            if (entry.isIntersecting) {
              this.visibleMembers[index] = true;
              observer.unobserve(entry.target);
            }
          });
        }, options);

        this.$nextTick(() => {
          const elements = document.querySelectorAll('.member-card');
          elements.forEach((el, index) => {
            el.setAttribute('data-index', index);
            observer.observe(el);
          });
        });
      }
    }
  }
  </script>

  <style scoped>
  /* Base Styles */
  .about-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    color: #1F2937;
  }

  /* Typography */
  h1, h2, h3 {
    font-weight: 700;
    line-height: 1.2;
  }

  .text-gradient {
    background: linear-gradient(90deg, #065F46 0%, #3B82F6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* Hero Section */
  .hero-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding: 6rem 0;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero-title {
    font-size: 3.5rem;
    margin-bottom: 0;
  }

  .hero-description {
    font-size: 1.25rem;
    color: #6B7280;
    line-height: 1.6;
    max-width: 90%;
  }

  .hero-image {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .hero-image:hover {
    transform: scale(1.02);
  }

  .hero-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .hero-cta {
    margin-top: 1.5rem;
  }

  .cta-button {
    background: linear-gradient(90deg, #065F46 0%, #3B82F6 100%);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  /* Section Header */
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    color: #065F46;
  }

  .section-title-decor {
    color: #D1FAE5;
    margin-right: 0.5rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: #6B7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Features Section */
  .features-section {
    padding: 6rem 0;
    position: relative;
    background-color: #ffffff;
  }

  .features-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(249, 250, 251, 0) 0%, #F9FAFB 100%);
    z-index: -1;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: #FFFFFF;
    padding: 2.5rem;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
    z-index: 1;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.02);
  }

  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .feature-card h3 {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
    color: #1F2937;
  }

  .feature-card p {
    color: #6B7280;
    line-height: 1.6;
  }

  .feature-icon {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .feature-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(6, 95, 70, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .feature-card:hover .feature-hover {
    opacity: 1;
  }

  /* Team Section */
  .team-section {
    padding: 6rem 0;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .member-card {
    background: #FFFFFF;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
    position: relative;
    overflow: hidden;
    z-index: 1;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.02);
  }

  .member-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .member-image-container {
    width: 160px;
    height: 160px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    border: 4px solid #D1FAE5;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .member-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .member-image-container img.zoomed {
    transform: scale(1.1);
  }

  .social-links {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(6, 95, 70, 0.8);
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  .social-links a {
    color: white;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }

  .social-links a:hover {
    transform: translateY(-3px);
    color: #D1FAE5;
  }

  .member-card h3 {
    font-size: 1.5rem;
    margin: 1rem 0 0.5rem;
    color: #1F2937;
  }

  .role {
    color: #065F46;
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  .bio {
    color: #6B7280;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0;
  }

  .member-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(6, 95, 70, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .member-card:hover .member-hover {
    opacity: 1;
  }

  /* Animations */
  .animate__animated {
    --animate-duration: 0.8s;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-section {
      grid-template-columns: 1fr;
      gap: 3rem;
      padding: 4rem 0;
    }

    .hero-content {
      text-align: center;
    }

    .hero-description {
      max-width: 100%;
    }

    .hero-cta {
      display: flex;
      justify-content: center;
    }

    .hero-image {
      max-width: 600px;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .features-grid, .team-grid {
      grid-template-columns: 1fr;
      max-width: 500px;
    }
  }

  @media (max-width: 480px) {
    .about-container {
      padding: 2rem 1rem;
    }

    .hero-title {
      font-size: 2rem;
    }

    .hero-description {
      font-size: 1.1rem;
    }

    .feature-card, .member-card {
      padding: 1.5rem;
    }
  }
  </style>