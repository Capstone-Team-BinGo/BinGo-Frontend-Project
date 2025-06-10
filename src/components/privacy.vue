<template>
    <div class="popup-overlay" @click.self="close">
      <div class="privacy-popup">
        <button class="close-btn" @click="close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="popup-content">
          <div class="logo">
            <div class="logo-icon">
             <i class="fas fa-lock"></i>
            </div>
            <h1>Kebijakan Privasi <span>Bingo</span></h1>
            <p>Terakhir diperbarui: 1 Juni 2025</p>
          </div>

          <div class="privacy-content">
            <div class="privacy-section">
              <h2><span class="section-number">1</span>Informasi yang Kami Kumpulkan</h2>
              <p>Kami mengumpulkan informasi yang Anda berikan saat mendaftar, termasuk nama, alamat email, dan data profil. Kami juga dapat mengumpulkan data penggunaan secara otomatis seperti alamat IP, jenis perangkat, dan aktivitas dalam aplikasi.</p>
            </div>

            <div class="privacy-section">
              <h2><span class="section-number">2</span>Cara Kami Menggunakan Data</h2>
              <p>Data digunakan untuk menyediakan dan meningkatkan layanan, personalisasi pengalaman, komunikasi, analisis, serta keamanan akun. Kami tidak akan menjual data pribadi Anda ke pihak ketiga.</p>
            </div>

            <div class="privacy-section">
              <h2><span class="section-number">3</span>Berbagi Data</h2>
              <p>Kami dapat berbagi data dengan penyedia layanan tepercaya yang membantu operasional kami, dengan kewajiban menjaga kerahasiaan. Data mungkin dibagikan jika diwajibkan oleh hukum.</p>
            </div>

            <div class="privacy-section">
              <h2><span class="section-number">4</span>Keamanan Data</h2>
              <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasional untuk melindungi data Anda. Namun, tidak ada sistem yang sepenuhnya aman, sehingga kami tidak dapat menjamin keamanan mutlak.</p>
            </div>

            <div class="privacy-section">
              <h2><span class="section-number">5</span>Hak Pengguna</h2>
              <p>Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda. Anda juga dapat menolak pemrosesan data tertentu atau mencabut persetujuan kapan saja melalui pengaturan akun.</p>
            </div>

            <div class="privacy-section">
              <h2><span class="section-number">6</span>Cookie dan Teknologi Serupa</h2>
              <p>Kami menggunakan cookie untuk meningkatkan pengalaman pengguna. Anda dapat mengelola preferensi cookie melalui pengaturan browser, tetapi beberapa fitur mungkin tidak berfungsi optimal.</p>
            </div>

            <div class="privacy-section">
              <h2><span class="section-number">7</span>Perubahan Kebijakan</h2>
              <p>Kami dapat memperbarui kebijakan ini secara berkala. Perubahan akan diberitahukan melalui aplikasi atau email. Penggunaan berkelanjutan setelah perubahan berarti penerimaan Anda.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'PrivacyPolicy',
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
  </script>

  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
    padding: 20px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .privacy-popup {
    background: white;
    border-radius: 24px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #f8f8f8;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: #f0f0f0;
    color: #333;
  }

  .popup-content {
    padding: 40px;
  }

  .logo {
    text-align: center;
    margin-bottom: 32px;
  }

  .logo-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    border-radius: 50%;
    padding: 16px;
  }

  .logo-icon i {
    color: #065F46;
    font-size: 30px;
  }

  .logo h1 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .logo span {
    font-weight: 800;
    background: linear-gradient(135deg, #10B981, #065F46);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo p {
    font-size: 15px;
    color: #666;
    margin: 0;
  }

  .privacy-content {
    font-size: 15px;
    line-height: 1.6;
    color: #4a4a4a;
  }

  .privacy-section {
    margin-bottom: 24px;
  }

  .privacy-section h2 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }

  .section-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #10B981;
    color: white;
    border-radius: 50%;
    font-size: 14px;
    margin-right: 12px;
    flex-shrink: 0;
  }

  .privacy-section p {
    margin: 0;
    padding-left: 36px;
  }

  .contact-section {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }

  .contact-section h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
  }

  .contact-section p {
    margin: 0;
  }

  a {
    color: #10B981;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 640px) {
    .popup-content {
      padding: 30px 20px;
    }

    .privacy-section h2 {
      font-size: 16px;
    }

    .privacy-section p {
      font-size: 14px;
      padding-left: 0;
    }

    .section-number {
      margin-right: 8px;
    }
  }
  </style>