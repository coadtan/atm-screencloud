import React, { useState } from 'react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { useBalanceStore } from '../stores/balanceStore';

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

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });

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
            {formatter.format(Number(withdrawalAmount))}
          </p>
          {displayMessage === 'non-withdrawable' ? (
            <div className="mt-4 bg-red-300 p-2 text-center">
              <p>Your overdraft limit has been exceeded.</p>
            </div>
          ) : null}
          {displayMessage === 'overdraft' ? (
            <div className="mt-4 bg-yellow-300 p-2 text-center">
              <p>You go overdrawn.</p>
            </div>
          ) : null}
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
