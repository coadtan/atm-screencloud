import React, { useState } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { usePinCheck } from '../hooks/usePinCheck';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';

export const LoginPage: React.FC = () => {
  const [pinValue, setPinValue] = useState('');
  const { pinCheck, result, reset } = usePinCheck();

  const inputPressHandler = (value: string) => {
    setPinValue((prev) => prev.concat(value));
  };

  const enterPressHandler = async () => {
    pinCheck(pinValue);
  };

  const clearPressHandler = () => {
    setPinValue('');
    reset();
  };

  return (
    <>
      <AtmScreenWrapper>
        <div>
          <div>Welcome to ABC Bank</div>
          <div>Enter Your Pin</div>
          <div className="flex flex-row gap-4">
            <PinInput
              type="number"
              mask
              size={'lg'}
              value={pinValue}
              manageFocus={false}
            >
              <PinInputField readOnly />
              <PinInputField readOnly />
              <PinInputField readOnly />
              <PinInputField readOnly />
            </PinInput>
          </div>

          {result === 'error' ? (
            <div className="mt-4 bg-red-300 p-2">Incorrect PIN.</div>
          ) : null}
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput onNumberInputPress={inputPressHandler} />
        <AtmActionInput
          onEnterPress={enterPressHandler}
          onClearPress={clearPressHandler}
          hideCancel={true}
          enterLoading={result === 'loading'}
        />
      </AtmInputWrapper>
    </>
  );
};
