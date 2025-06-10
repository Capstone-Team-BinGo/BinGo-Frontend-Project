<template>
    <div class="not-found-container">
      <!-- Floating decorative elements -->
      <div class="floating-elements">
        <div v-for="i in 12" :key="i" class="floating-element" :style="getFloatingStyle(i)"></div>
      </div>
  
      <!-- Main content -->
      <div class="not-found-content">
        <div class="error-animation">
          <div class="error-number">4</div>
          <div class="planet">
            <div class="crater"></div>
            <div class="crater"></div>
            <div class="crater"></div>
          </div>
          <div class="error-number">4</div>
        </div>
  
        <h1 class="error-title">Halaman Tidak Ditemukan</h1>
        <p class="error-message">
          Sepertinya Anda tersesat di luar angkasa! Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
  
        <div class="astronaut">
          <div class="helmet">
            <div class="visor"></div>
          </div>
          <div class="body">
            <div class="arm left"></div>
            <div class="arm right"></div>
          </div>
          <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
          </div>
        </div>
  
        <router-link to="/" class="home-button">
          <i class="fas fa-arrow-left"></i> Kembali ke Beranda
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage',
    methods: {
      getFloatingStyle(index) {
        const colors = ['rgba(76, 175, 80, 0.1)', 'rgba(33, 150, 243, 0.1)', 'rgba(255, 152, 0, 0.1)'];
        const sizes = ['8px', '12px', '16px', '20px'];
        const shapes = ['50%', '30%', '20% 80% 20% 80%'];
        
        return {
          backgroundColor: colors[index % colors.length],
          width: sizes[index % sizes.length],
          height: sizes[index % sizes.length],
          borderRadius: shapes[index % shapes.length],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${15 + Math.random() * 20}s`,
          animationDelay: `${Math.random() * 5}s`,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .not-found-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#065F46;
    color: white;
    position: relative;
    overflow: hidden;
    padding: 20px;
  }
  
  .floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0;
  }
  
  .floating-element {
    position: absolute;
    opacity: 0.6;
    animation: floatAnimation linear infinite;
  }
  
  @keyframes floatAnimation {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(0) translateX(20px);
    }
    75% {
      transform: translateY(20px) translateX(10px);
    }
  }
  
  .not-found-content {
    text-align: center;
    position: relative;
    z-index: 1;
    max-width: 800px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .error-animation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
  }
  
  .error-number {
    font-size: 120px;
    font-weight: 700;
    color: #4CAF50;
    text-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
    animation: pulse 2s infinite alternate;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }
    100% {
      transform: scale(1.05);
      text-shadow: 0 0 20px rgba(76, 175, 80, 0.8);
    }
  }
  
  .planet {
    width: 100px;
    height: 100px;
    background: #FF5722;
    border-radius: 50%;
    margin: 0 30px;
    position: relative;
    box-shadow: 0 0 30px rgba(255, 87, 34, 0.5);
    animation: rotate 20s linear infinite;
  }
  
  .crater {
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }
  
  .crater:nth-child(1) {
    width: 20px;
    height: 20px;
    top: 20px;
    left: 20px;
  }
  
  .crater:nth-child(2) {
    width: 15px;
    height: 15px;
    top: 60px;
    left: 30px;
  }
  
  .crater:nth-child(3) {
    width: 25px;
    height: 25px;
    top: 40px;
    left: 60px;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .error-title {
    font-size: 32px;
    margin-bottom: 20px;
    color: #ffffff;
    font-weight: 600;
  }
  
  .error-message {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  .home-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    background: linear-gradient(135deg, #4CAF50, #2E7D32);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(46, 125, 50, 0.3);
    margin-top: 30px;
  }
  
  .home-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(46, 125, 50, 0.4);
  }
  
  .home-button:active {
    transform: translateY(0);
  }
  
  .home-button i {
    margin-right: 8px;
  }
  
  .astronaut {
    position: absolute;
    width: 120px;
    height: 180px;
    right: -60px;
    bottom: -90px;
    animation: floatAstronaut 6s ease-in-out infinite;
  }
  
  .helmet {
    position: absolute;
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    top: 0;
    left: 20px;
  }
  
  .visor {
    position: absolute;
    width: 50px;
    height: 30px;
    background: #2196F3;
    border-radius: 15px;
    top: 25px;
    left: 15px;
  }
  
  .body {
    position: absolute;
    width: 70px;
    height: 80px;
    background: white;
    border-radius: 20px;
    top: 70px;
    left: 25px;
  }
  
  .arm {
    position: absolute;
    width: 20px;
    height: 50px;
    background: white;
    border-radius: 10px;
    top: 80px;
  }
  
  .arm.left {
    left: 5px;
    transform: rotate(30deg);
  }
  
  .arm.right {
    right: 5px;
    transform: rotate(-30deg);
  }
  
  .legs {
    position: absolute;
    width: 70px;
    height: 40px;
    top: 150px;
    left: 25px;
  }
  
  .leg {
    position: absolute;
    width: 20px;
    height: 50px;
    background: white;
    border-radius: 10px;
    top: 0;
  }
  
  .leg.left {
    left: 10px;
    transform: rotate(-10deg);
  }
  
  .leg.right {
    right: 10px;
    transform: rotate(10deg);
  }
  
  @keyframes floatAstronaut {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .not-found-content {
      padding: 30px 20px;
    }
    
    .error-number {
      font-size: 80px;
    }
    
    .planet {
      width: 70px;
      height: 70px;
      margin: 0 15px;
    }
    
    .error-title {
      font-size: 24px;
    }
    
    .error-message {
      font-size: 16px;
    }
    
    .astronaut {
      width: 80px;
      height: 120px;
      right: -40px;
      bottom: -60px;
    }
    
    .helmet {
      width: 50px;
      height: 50px;
      left: 15px;
    }
    
    .visor {
      width: 30px;
      height: 20px;
      top: 15px;
      left: 10px;
    }
    
    .body {
      width: 50px;
      height: 60px;
      top: 45px;
      left: 15px;
    }
    
    .arm {
      width: 15px;
      height: 30px;
      top: 50px;
    }
    
    .legs {
      width: 50px;
      height: 30px;
      top: 105px;
      left: 15px;
    }
    
    .leg {
      width: 15px;
      height: 30px;
    }
  }
  </style>