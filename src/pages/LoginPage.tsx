import React, { useState } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { AtmScreen } from '../components/AtmScreen';
import { AtmInput } from '../components/AtmInput';
import { usePinCheck } from '../hooks/usePinCheck';

export const LoginPage: React.FC = () => {
  const [pinValue, setPinValue] = useState('');
  const { pinCheck, result: _result } = usePinCheck();

  const inputPressHandler = (value: string) => {
    setPinValue(value);
  };

  const enterPressHandler = async (value: string) => {
    pinCheck(value);
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
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </div>
        </div>
      </AtmScreen>
      <AtmInput
        onNumberInputPress={inputPressHandler}
        onEnterPress={enterPressHandler}
        maxInput={4}
      />
    </>
  );
};
