import { create } from 'zustand';

interface AuthState {
  isAuth: boolean;
  authenticated: () => void;
  unauthenticated: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuth: false,
  authenticated: () => set(() => ({ isAuth: true })),
  unauthenticated: () => set(() => ({ isAuth: false })),
}));
