import React, { useEffect, useState } from 'react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { getBalance } from '../localStorage/atmStorage';
import { Button } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/router';

export const AtmPage: React.FC = () => {
  useCheckAuth();
  const navigate = useNavigate();

  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    const balanceLocalStorage = getBalance();
    if (balanceLocalStorage) {
      setCurrentBalance(balanceLocalStorage);
    }
  }, []);

  const inputPressHandler = (_value: string) => {};

  const goToWithDraw = () => {
    navigate({ to: '/withdraw' });
  };

  return (
    <>
      <AtmScreenWrapper>
        <div>ATMPage</div>
        <div className="mt-8 flex flex-row">
          <div className="w-3/4">
            <p>your balance: {currentBalance}</p>
          </div>
          <div className="flex w-1/4 flex-col gap-8">
            <Button onClick={goToWithDraw}>Withdraw</Button>
            <Button>History</Button>
          </div>
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput onNumberInputPress={inputPressHandler} />
        <AtmActionInput />
      </AtmInputWrapper>
    </>
  );
};
