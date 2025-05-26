<template>
    <div class="login-container">
      <div class="login-card">
        <div class="login-form">
          <div class="logo">
            <span class="logo-text">Bingo</span>
          </div>
          
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="Enter your email" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                placeholder="Enter your password" 
                required
              >
            </div>
            
            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" v-model="rememberMe">
                <span>Remember me</span>
              </label>
               <p class="forgot-password" @click="openForgotPasswordModal">
      Forgot password?
    </p>
            </div>
            
            <button type="submit" class="login-button">Sign In</button>
          </form>
  
          <div class="divider">
            <span class="divider-line"></span>
            <span class="divider-text">or</span>
            <span class="divider-line"></span>
          </div>
          
          <div class="social-login">
            <button class="social-btn google-btn" @click="loginWithGoogle">
                <img class="social-icon" src="@/assets/google.png" alt="Google logo" />
              Continue with Google
            </button>
          </div>
          <p class="signup-link">Don't have an account? <router-link to="/register" class="signup-link">Sign Up
        </router-link></p>
        </div>
        
        <div class="login-image">
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    props: ['showForgotPasswordModal'],
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false
      }
    },
    methods: {
      handleLogin() {
        // Handle login logic here
        console.log('Logging in with:', {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe
        });
      },
      loginWithGoogle() {
        // Handle Google login logic here
        console.log('Logging in with Google');
      },
      openForgotPasswordModal() {
      this.$emit('open-forgot-password');  // Emit event ke App.vue untuk membuka modal Forgot Password
    }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f8fafc;
  }
  
  .login-card {
    display: flex;
    max-width: 1000px;
    width: 100%;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .login-form {
    flex: 1;
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .logo {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo-text {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  transition: all 0.3s ease;
}
  
  .logo svg {
    width: 48px;
    height: 48px;
    color: #3b82f6;
  }
  
  .logo h1 {
    margin-top: 16px;
    font-size: 24px;
    font-weight: 600;
    color: #1e293b;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    font-size: 14px;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    color: #475569;
  }
  
  .remember-me input {
    margin-right: 8px;
  }
  
  .forgot-password {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }
  
  .forgot-password:hover {
    text-decoration: underline;
  }
  
  .login-button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .login-button:hover {
    opacity: 0.9;
  }
  
  .divider {
    display: flex;
    align-items: center;
    margin: 24px 0;
  }
  
  .divider-line {
    flex: 1;
    height: 1px;
    background-color: #e2e8f0;
  }
  
  .divider-text {
    padding: 0 12px;
    color: #64748b;
    font-size: 14px;
  }
  
  .social-login {
    margin-top: 16px;
  }
  
  .social-btn {
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.2s;
  }
  
  .social-btn:hover {
    background-color: #f8fafc;
  }
  
  .google-btn {
    color: #1e293b;
  }
  
  .social-icon {
    width: 18px;
    height: 18px;
  }
  
  .signup-link {
    margin-top: 32px;
    text-align: center;
    font-size: 14px;
    color: #64748b;
  }
  
  .signup-link a {
    color: #3b82f6;
    font-weight: 500;
    text-decoration: none;
  }
  
  .signup-link a:hover {
    text-decoration: underline;
  }
  
  .login-image {
    flex: 1;
    background: url('@/assets/sampah-1.jpg') center/cover;
    position: relative;
    display: none;
  }
  
  
  @media (min-width: 768px) {
    .login-image {
      display: block;
    }
  }
  </style>