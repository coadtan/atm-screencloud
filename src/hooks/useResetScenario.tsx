import { useNavigate } from '@tanstack/router';
import { useBalanceStore } from '../stores/balanceStore';
import { useAuthStore } from '../stores/authStore';
import { useNoteStore } from '../stores/noteStore';
import { useTransactionStore } from '../stores/transactionStore';

export const useResetScenario = () => {
  const navigate = useNavigate();
  const resetBalance = useBalanceStore((state) => state.reset);
  const unauthenticated = useAuthStore((state) => state.unauthenticated);
  const resetNotes = useNoteStore((state) => state.resetNotes);
  const resetTransaction = useTransactionStore(
    (state) => state.resetTransaction,
  );

  const resetScenario = () => {
    unauthenticated();
    resetBalance();
    resetNotes();
    resetTransaction();
    navigate({ to: '/' });
  };

  return resetScenario;
};
