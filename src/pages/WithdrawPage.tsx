import React, { useEffect, useState } from 'react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { getBalance } from '../localStorage/atmStorage';

export const WithdrawPage: React.FC = () => {
  useCheckAuth();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  useEffect(() => {
    const balanceLocalStorage = getBalance();
    if (balanceLocalStorage) {
      setCurrentBalance(balanceLocalStorage);
    }
  }, []);

  const numberInputPressHandler = (value: string) => {
    setWithdrawalAmount((prev) => prev.concat(value));
  };

  const clearInputPressHandler = () => {
    setWithdrawalAmount('');
  };

  const enterInputPressHandler = () => {
    const userBalance = getBalance();

    if (userBalance) {
      const withdrawalAmountNumber = Number(withdrawalAmount);

      if (withdrawalAmountNumber) {
        // TODO handle withdraw logic
      }
    } else {
      // TODO error
    }
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
