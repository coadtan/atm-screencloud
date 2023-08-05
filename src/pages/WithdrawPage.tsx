import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { useBalanceStore } from '../stores/balanceStore';
import { euroFormatter } from '../utils/euroFormatter';

const displayMessageText = {
  'non-withdrawable': 'Your overdraft limit has been exceeded.',
  overdraft: 'You go overdrawn.',
};

export const WithdrawPage: React.FC = () => {
  useCheckAuth();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const currentBalance = useBalanceStore((state) => state.currentBalance);
  const withdraw = useBalanceStore((state) => state.withdraw);
  const [displayMessage, setDisplayMessage] = useState<
    'not-show' | 'overdraft' | 'non-withdrawable'
  >('not-show');

  const numberInputPressHandler = (value: string) => {
    setDisplayMessage('not-show');

    setWithdrawalAmount((prev) => prev.concat(value));
  };

  const clearInputPressHandler = () => {
    setDisplayMessage('not-show');
    setWithdrawalAmount('');
  };

  const enterInputPressHandler = () => {
    const withdrawalAmountNumber = Number(withdrawalAmount);

    if (withdrawalAmountNumber > currentBalance) {
      const isOverdrawn = withdrawalAmountNumber - currentBalance <= 100;

      if (isOverdrawn) {
        withdraw(withdrawalAmountNumber);
        setDisplayMessage('overdraft');
      } else {
        setDisplayMessage('non-withdrawable');
      }
    } else {
      withdraw(withdrawalAmountNumber);
    }

    setWithdrawalAmount('');
  };

  return (
    <>
      <AtmScreenWrapper>
        <div>WithdrawPage</div>
        <div>
          <p>your balance: {currentBalance}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="mx-auto">Amount</p>
          <p className="mx-auto w-2/4 border p-4 text-center">
            {euroFormatter.format(Number(withdrawalAmount))}
          </p>
          {displayMessage !== 'not-show' && (
            <div
              className={twMerge(
                'mt-4 p-2 text-center',
                displayMessage === 'non-withdrawable' && 'bg-red-300',
                displayMessage === 'overdraft' && 'bg-yellow-300',
              )}
            >
              <p>{displayMessageText[displayMessage]}</p>
            </div>
          )}
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput onNumberInputPress={numberInputPressHandler} />
        <AtmActionInput
          onClearPress={clearInputPressHandler}
          onEnterPress={enterInputPressHandler}
        />
      </AtmInputWrapper>
    </>
  );
};
