import { useState } from 'react';
import { useNoteStore } from '../stores/noteStore';
import { useBalanceStore } from '../stores/balanceStore';
import { calculateNotes } from '../utils/calculateNotes';

export type WithdrawStatusType =
  | 'not-show'
  | 'overdraft'
  | 'insufficient-withdraw-limit'
  | 'insufficient-atm-balance'
  | 'available-notes-not-matched';

type UseWithdrawReturnType = {
  withdrawStatus: WithdrawStatusType;
  resetWithdrawStatus: () => void;
  withdraw: (amount: number) => void;
};

export const useWithdraw = (): UseWithdrawReturnType => {
  const withdrawFromATM = useBalanceStore((state) => state.withdraw);
  const currentBalance = useBalanceStore((state) => state.currentBalance);
  const noteInATM = useNoteStore((state) => state.noteNumber);
  const decreaseNoteNumber = useNoteStore((state) => state.decreaseNoteNumber);
  const getRemainingAtmBalance = useNoteStore(
    (state) => state.getRemainingAtmBalance,
  );

  const [withdrawStatus, setWithdrawStatus] =
    useState<WithdrawStatusType>('not-show');

  const resetWithdrawStatus = () => {
    setWithdrawStatus('not-show');
  };

  const withdrawProcess = (amount: number) => {
    const { isWithdrawalSuccessful, noteUsed } = calculateNotes(
      amount,
      noteInATM,
    );

    if (!isWithdrawalSuccessful) {
      setWithdrawStatus('available-notes-not-matched');
      return;
    }

    decreaseNoteNumber(noteUsed);
    withdrawFromATM(amount);
  };

  const withdraw = (amount: number) => {
    resetWithdrawStatus();

    if (amount > getRemainingAtmBalance()) {
      setWithdrawStatus('insufficient-atm-balance');
    } else if (amount > currentBalance) {
      const isOverdrawn = amount - currentBalance <= 100;
      if (isOverdrawn) {
        setWithdrawStatus('overdraft');
        withdrawProcess(amount);
      } else {
        setWithdrawStatus('insufficient-withdraw-limit');
      }
    } else {
      withdrawProcess(amount);
    }
  };

  return {
    withdrawStatus,
    resetWithdrawStatus,
    withdraw,
  };
};
