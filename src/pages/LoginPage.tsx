import React, { useState } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { AtmScreen } from '../components/AtmScreen';
import { AtmInput } from '../components/AtmInput';

export const LoginPage: React.FC = () => {
  const [pinValue, setPinValue] = useState('');
  console.log('🚀 ~ file: LoginPage.tsx:8 ~ pinValue:', pinValue);

  const inputPressHandler = (value: string) => {
    setPinValue(value);
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
        maxInput={4}
      />
    </>
  );
};
