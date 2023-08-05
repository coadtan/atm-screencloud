import { useState } from 'react';
import { useNoteStore } from '../stores/noteStore';
import { useBalanceStore } from '../stores/balanceStore';

export type WithdrawStatusType =
  | 'not-show'
  | 'overdraft'
  | 'insufficient-withdraw-limit'
  | 'insufficient-atm-balance';

type UseWithdrawReturnType = {
  withdrawStatus: WithdrawStatusType;
  resetWithdrawStatus: () => void;
  withdraw: (amount: number) => void;
};

export const useWithdraw = (): UseWithdrawReturnType => {
  const withdrawFromATM = useBalanceStore((state) => state.withdraw);
  const getRemainingAtmBalance = useNoteStore(
    (state) => state.getRemainingAtmBalance,
  );
  const currentBalance = useBalanceStore((state) => state.currentBalance);

  const [withdrawStatus, setWithdrawStatus] =
    useState<WithdrawStatusType>('not-show');

  const resetWithdrawStatus = () => {
    setWithdrawStatus('not-show');
  };

  const withdraw = (amount: number) => {
    resetWithdrawStatus();

    if (amount > getRemainingAtmBalance()) {
      setWithdrawStatus('insufficient-atm-balance');
    } else if (amount > currentBalance) {
      const isOverdrawn = amount - currentBalance <= 100;
      if (isOverdrawn) {
        setWithdrawStatus('overdraft');
        withdrawFromATM(amount);
      } else {
        setWithdrawStatus('insufficient-withdraw-limit');
      }
    } else {
      withdrawFromATM(amount);
    }
  };

  return {
    withdrawStatus,
    resetWithdrawStatus,
    withdraw,
  };
};
