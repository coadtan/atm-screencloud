import React from 'react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';

export const AtmPage: React.FC = () => {
  useCheckAuth();

  const inputPressHandler = (_value: string) => {};

  return (
    <>
      <AtmScreenWrapper>
        <div>ATMPage</div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput onNumberInputPress={inputPressHandler} />
        <AtmActionInput />
      </AtmInputWrapper>
    </>
  );
};
