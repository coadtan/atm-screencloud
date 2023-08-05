import React from 'react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { Button } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/router';
import { useResetScenario } from '../hooks/useResetScenario';
import { UserBalance } from '../components/UserBalance';

export const AtmPage: React.FC = () => {
  useCheckAuth();
  const navigate = useNavigate();
  const resetScenario = useResetScenario();

  const inputPressHandler = (_value: string) => {};

  const goToWithDraw = () => {
    navigate({ to: '/withdraw' });
  };

  const cancelInputPressHandler = () => {
    resetScenario();
  };

  return (
    <>
      <AtmScreenWrapper>
        <div>ATMPage</div>
        <div className="mt-8 flex flex-row">
          <div className="w-3/4">
            <UserBalance />
          </div>
          <div className="flex w-1/4 flex-col gap-8">
            <Button onClick={goToWithDraw}>Withdraw</Button>
            <Button>History</Button>
          </div>
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput onNumberInputPress={inputPressHandler} />
        <AtmActionInput onCancelPress={cancelInputPressHandler} />
      </AtmInputWrapper>
    </>
  );
};
