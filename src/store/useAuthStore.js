// store/useAuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
