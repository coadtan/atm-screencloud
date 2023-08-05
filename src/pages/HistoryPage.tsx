import React from 'react';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { useNavigate } from '@tanstack/router';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';

export const HistoryPage: React.FC = () => {
  useCheckAuth();
  const navigate = useNavigate();

  const cancelInputPressHandler = () => {
    navigate({ to: '/atm' });
  };

  return (
    <>
      <AtmScreenWrapper>
        <div>HistoryPage</div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput
          onNumberInputPress={() => {}}
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
