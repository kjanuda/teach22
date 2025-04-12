import { create } from 'zustand';

const useAuthStore = create((set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
  logout: () => set({ username: '' }),
}));

export default useAuthStore;
