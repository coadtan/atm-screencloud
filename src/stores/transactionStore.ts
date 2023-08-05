import { create } from 'zustand';

type TransactionType = {
  isInitBalance: boolean;
  when: Date;
  amount: number;
  balance: number;
};

interface TransactionState {
  transactionList: TransactionType[];
  initTransaction: (balance: number) => void;
  addTransaction: (newTransaction: TransactionType) => void;
  resetTransaction: () => void;
}

export const useTransactionStore = create<TransactionState>()((set) => ({
  transactionList: [],
  initTransaction: (balance: number) =>
    set(() => ({
      transactionList: [
        { isInitBalance: true, when: new Date(), amount: 0, balance: balance },
      ],
    })),
  addTransaction: (newTransaction: TransactionType) =>
    set((state) => ({
      transactionList: [...state.transactionList, newTransaction],
    })),
  resetTransaction: () =>
    set(() => ({
      transactionList: [],
    })),
}));
