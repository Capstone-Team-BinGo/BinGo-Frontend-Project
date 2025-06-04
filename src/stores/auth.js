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
    },
    setUser(user) {
      this.user = user;
    },
  },
});
