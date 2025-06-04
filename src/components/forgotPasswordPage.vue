<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card">
        <button class="close-btn" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <div class="modal-header">
          <div class="modal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>Lupa Kata Sandi?</h2>
          <p>Masukkan email Anda untuk reset password</p>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder=" "
            />
            <label for="email">Alamat Email</label>
            <div class="form-underline"></div>
          </div>
          
          <button type="submit" class="submit-btn">
            <span>Reset Email </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
            </svg>
          </button>
        </form>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ForgotPasswordModal",
    data() {
      return {
        email: "",
      };
    },
    methods: {
      handleSubmit() {
  if (!this.email) return;
  this.$emit("open-reset-password"); 
  this.email = "";
  this.$emit("close"); 
}
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }
  
  .modal-card {
    background: white;
    padding: 32px;
    border-radius: 20px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    width: 100%;
    max-width: 420px;
    position: relative;
    transform: translateY(0);
    animation: modal-appear 0.3s ease-out;
  }
  
  @keyframes modal-appear {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #64748b;
    border-radius: 50%;
    transition: all 0.2s;
  }
  
  .close-btn:hover {
    background-color: #f1f5f9;
    color: #334155;
  }
  
  .close-btn svg {
    width: 20px;
    height: 20px;
  }
  
  .modal-header {
    text-align: center;
    margin-bottom: 28px;
  }
  
  .modal-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0fdf4;
    border-radius: 50%;
    color: #10b981;
  }
  
  .modal-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .modal-header h2 {
    font-size: 24px;
    margin: 0 0 8px;
    color: #1e293b;
    font-weight: 600;
  }
  
  .modal-header p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }
  
  .form-group {
    position: relative;
    margin-bottom: 24px;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px 0;
    border: none;
    border-bottom: 1px solid #e2e8f0;
    font-size: 16px;
    background-color: transparent;
    transition: all 0.3s;
  }
  
  .form-group input:focus {
    outline: none;
    border-bottom-color: #10b981;
  }
  
  .form-group input:focus + label,
  .form-group input:not(:placeholder-shown) + label {
    transform: translateY(-24px) scale(0.85);
    color: #10b981;
  }
  
  .form-group label {
    position: absolute;
    left: 0;
    top: 12px;
    color: #64748b;
    font-size: 16px;
    transition: all 0.3s;
    transform-origin: left top;
    pointer-events: none;
  }
  
  .form-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #10b981;
    transition: width 0.3s;
  }
  
  .form-group input:focus ~ .form-underline {
    width: 100%;
  }
  
  .submit-btn {
    width: 100%;
    background: #42835A;
    color: white;
    padding: 14px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;
    box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2), 0 2px 4px -1px rgba(16, 185, 129, 0.12);
  }
  
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.15);
  }
  
  .submit-btn svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s;
  }
  
  .submit-btn:hover svg {
    transform: translateX(4px);
  }
  
  </style>