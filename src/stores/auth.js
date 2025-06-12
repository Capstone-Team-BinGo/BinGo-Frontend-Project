import { defineStore } from 'pinia';
import { auth, googleProvider, signInWithPopup, signOut } from '@/firebase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async loginWithGoogle() {
      const result = await signInWithPopup(auth, googleProvider);
      this.user = result.user;
    },
    async logout() {
      await signOut(auth);
      this.user = null;

      // Hapus data Google dari localStorage
      localStorage.removeItem('user'); // Data Google user
      localStorage.removeItem('loginTimestamp'); // Timestamp login
    },
    setUser(user) {
      this.user = user;
    },
  },
});
