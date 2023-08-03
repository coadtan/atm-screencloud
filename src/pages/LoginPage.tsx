import React, { useState } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { AtmScreen } from '../components/AtmScreen';
import { AtmInput } from '../components/AtmInput';
import { usePinCheck } from '../hooks/usePinCheck';

export const LoginPage: React.FC = () => {
  const [pinValue, setPinValue] = useState('');
  const { pinCheck, result, reset } = usePinCheck();

  const inputPressHandler = (value: string) => {
    setPinValue(value);
  };

  const enterPressHandler = async (value: string) => {
    pinCheck(value);
  };

  const clearPressHandler = () => {
    reset();
  };

  return (
    <>
      <AtmScreen>
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
      </AtmScreen>
      <AtmInput
        onNumberInputPress={inputPressHandler}
        onEnterPress={enterPressHandler}
        onClearPress={clearPressHandler}
        maxInput={4}
        hideCancel={true}
        enterLoading={result === 'loading'}
      />
    </>
  );
};
