import { create } from 'zustand';

interface BalanceState {
  currentBalance: number;
  init: (balance: number) => void;
  reset: () => void;
  withdraw: (amount: number) => void;
}

export const useBalanceStore = create<BalanceState>()((set) => ({
  currentBalance: 0,
  init: (balance) => set(() => ({ currentBalance: balance })),
  reset: () => set({ currentBalance: 0 }),
  withdraw: (amount) =>
    set((state) => ({ currentBalance: state.currentBalance - amount })),
}));
