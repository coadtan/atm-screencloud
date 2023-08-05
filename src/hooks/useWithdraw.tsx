import { useState } from 'react';
import { type NoteNumberType, useNoteStore } from '../stores/noteStore';
import { useBalanceStore } from '../stores/balanceStore';
import { calculateNotes } from '../utils/calculateNotes';
import { useTransactionStore } from '../stores/transactionStore';

export type WithdrawStatusType =
  | 'not-show'
  | 'invalid-amount'
  | 'overdraft'
  | 'insufficient-withdraw-limit'
  | 'insufficient-atm-balance'
  | 'available-notes-not-matched';

type UseWithdrawReturnType = {
  withdrawStatus: WithdrawStatusType;
  resetWithdrawStatus: () => void;
  withdraw: (amount: number) => NoteNumberType | undefined;
};

export const useWithdraw = (): UseWithdrawReturnType => {
  const withdrawFromATM = useBalanceStore((state) => state.withdraw);
  const currentBalance = useBalanceStore((state) => state.currentBalance);
  const getCurrentBalance = useBalanceStore((state) => state.getCurrentBalance);
  const noteInATM = useNoteStore((state) => state.noteNumber);
  const decreaseNoteNumber = useNoteStore((state) => state.decreaseNoteNumber);
  const getRemainingAtmBalance = useNoteStore(
    (state) => state.getRemainingAtmBalance,
  );
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [withdrawStatus, setWithdrawStatus] =
    useState<WithdrawStatusType>('not-show');

  const resetWithdrawStatus = () => {
    setWithdrawStatus('not-show');
  };

  const withdrawProcess = (amount: number): NoteNumberType | undefined => {
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

    addTransaction({
      isInitBalance: false,
      when: new Date(),
      amount: amount,
      balance: getCurrentBalance(),
    });

    return noteUsed;
  };

  const withdraw = (amount: number): NoteNumberType | undefined => {
    resetWithdrawStatus();

    if (amount <= 0) {
      setWithdrawStatus('invalid-amount');
      return;
    }

    if (amount > getRemainingAtmBalance()) {
      setWithdrawStatus('insufficient-atm-balance');
      return;
    } else if (amount > currentBalance) {
      const isOverdrawn = amount - currentBalance <= 100;
      if (isOverdrawn) {
        setWithdrawStatus('overdraft');
      } else {
        setWithdrawStatus('insufficient-withdraw-limit');
        return;
      }
    }

    const noteUsed = withdrawProcess(amount);

    return noteUsed;
  };

  return {
    withdrawStatus,
    resetWithdrawStatus,
    withdraw,
  };
};
