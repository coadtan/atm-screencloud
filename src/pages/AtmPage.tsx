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
import { IconCashBanknote, IconHistory } from '@tabler/icons-react';

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
        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="border p-4 text-center shadow-sm">
            <UserBalance />
          </div>
          <div className="flex gap-8">
            <Button
              colorScheme="green"
              leftIcon={<IconCashBanknote />}
              onClick={goToWithDraw}
            >
              Withdraw
            </Button>
            <Button
              leftIcon={<IconHistory />}
              variant={'outline'}
            >
              History
            </Button>
          </div>
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput
          onNumberInputPress={inputPressHandler}
          isDisabled
        />
        <AtmActionInput
          onCancelPress={cancelInputPressHandler}
          hideClear
          hideEnter
        />
      </AtmInputWrapper>
    </>
  );
};
