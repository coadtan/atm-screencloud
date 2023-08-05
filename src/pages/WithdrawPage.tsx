import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { euroFormatter } from '../utils/euroFormatter';
import { WithdrawStatusType, useWithdraw } from '../hooks/useWithdraw';
import { useNavigate } from '@tanstack/router';
import { UserBalance } from '../components/UserBalance';

const displayMessageText: Record<WithdrawStatusType, string> = {
  'not-show': '',
  'insufficient-withdraw-limit': 'Your overdraft limit has been exceeded.',
  'insufficient-atm-balance': 'The atm has insufficient cash.',
  overdraft: 'You go overdrawn.',
  'available-notes-not-matched':
    'Cannot withdraw the exact amount with available notes.',
};

export const WithdrawPage: React.FC = () => {
  useCheckAuth();
  const navigate = useNavigate();

  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const { withdraw, withdrawStatus, resetWithdrawStatus } = useWithdraw();

  const numberInputPressHandler = (value: string) => {
    resetWithdrawStatus();
    setWithdrawalAmount((prev) => prev.concat(value));
  };

  const clearInputPressHandler = () => {
    resetWithdrawStatus();
    setWithdrawalAmount('');
  };

  const cancelInputPressHandler = () => {
    navigate({ to: '/atm' });
  };

  const enterInputPressHandler = () => {
    const withdrawalAmountNumber = Number(withdrawalAmount);

    withdraw(withdrawalAmountNumber);

    setWithdrawalAmount('');
  };

  return (
    <>
      <AtmScreenWrapper>
        <div className="my-auto flex flex-col gap-4">
          <p className="mx-auto">Withdraw Amount</p>
          <p className="mx-auto w-2/4 border p-4 text-center">
            {euroFormatter.format(Number(withdrawalAmount))}
          </p>
          {withdrawStatus !== 'not-show' && (
            <div
              className={twMerge(
                'mt-4 p-2 text-center',
                withdrawStatus === 'insufficient-withdraw-limit' &&
                  'bg-red-300',
                withdrawStatus === 'insufficient-atm-balance' && 'bg-red-400',
                withdrawStatus === 'available-notes-not-matched' &&
                  'bg-red-400',
                withdrawStatus === 'overdraft' && 'bg-yellow-300',
              )}
            >
              <p>{displayMessageText[withdrawStatus]}</p>
            </div>
          )}
        </div>
        <div className="mt-auto text-center">
          <UserBalance />
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput onNumberInputPress={numberInputPressHandler} />
        <AtmActionInput
          onClearPress={clearInputPressHandler}
          onEnterPress={enterInputPressHandler}
          onCancelPress={cancelInputPressHandler}
        />
      </AtmInputWrapper>
    </>
  );
};
