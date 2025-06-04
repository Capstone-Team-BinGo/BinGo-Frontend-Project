<template>
    <div class="popup-overlay" @click.self="closePopup">
      <div class="login-popup">
        <button class="close-btn" @click="closePopup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
  
        <div class="popup-content">
          <div class="logo">
            <div class="logo-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#10B981"/>
                <path d="M12 6C14.7614 6 17 8.23858 17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11C7 8.23858 9.23858 6 12 6Z" fill="white"/>
                <path d="M12 18C15.31 18 18 16.21 18 14H6C6 16.21 8.69 18 12 18Z" fill="white"/>
              </svg>
            </div>
            <h1>Selamat Datang di <span>Bingo</span></h1>
            <p>Manajemen sampah cerdas dimulai di sini</p>
          </div>
  
          <button class="google-btn" @click="loginWithGoogle">
            <img src="@/assets/google.png" alt="Logo Google" />
            Lanjutkan dengan Google
          </button>
  
          <div class="terms">
            Dengan melanjutkan, Anda menyetujui <a href="#">Syarat Layanan</a> dan <a href="#">Kebijakan Privasi</a> kami
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { auth, googleProvider } from "@/firebase";
  import { signInWithPopup } from "firebase/auth";
  import { useToast } from "vue-toastification";
  
  export default {
    name: 'GoogleLoginModal',
    setup() {
      const toast = useToast();
      return { toast };
    },
    methods: {
      closePopup() {
        this.$emit('close');
      },
      
      async loginWithGoogle() {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          console.log("Google login success:", user);
          googleProvider.setCustomParameters({ prompt: 'select_account' });
  
          localStorage.setItem("user", JSON.stringify(user));
          this.$emit('login-success');
        } catch (error) {
          console.error("Google login failed:", error.message);
          this.toast.error("Failed to login with Google. Please try again.");
        }
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
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .login-popup {
    background: white;
    border-radius: 24px;
    width: 100%;
    max-width: 380px;
    padding: 40px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .logo {
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
  
  .google-btn {
    width: 100%;
    padding: 14px 16px;
    background: white;
    color: #3c4043;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
  }
  
  .google-btn:hover {
    background: #f9f9f9;
    border-color: #d0d0d0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .google-btn:active {
    background: #f1f1f1;
    transform: translateY(1px);
  }
  
  .google-btn img {
    width: 20px;
    height: 20px;
  }
  
  .terms {
    font-size: 13px;
    color: #999;
    text-align: center;
    line-height: 1.5;
    max-width: 280px;
  }
  
  .terms a {
    color: #10B981;
    text-decoration: none;
    font-weight: 500;
  }
  
  .terms a:hover {
    text-decoration: underline;
  }
  </style>