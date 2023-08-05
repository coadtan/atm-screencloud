import React, { useEffect, useState } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { usePinCheck } from '../hooks/usePinCheck';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useNavigate } from '@tanstack/router';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { useBalanceStore } from '../stores/balanceStore';
import { useAuthStore } from '../stores/authStore';
import { useTransactionStore } from '../stores/transactionStore';

export const LoginPage: React.FC = () => {
  useCheckAuth();

  const [pinValue, setPinValue] = useState('');
  const [disableNumberInput, setDisableNumberInput] = useState(false);
  const { pinCheck, pinCheckState, reset } = usePinCheck();
  const navigate = useNavigate({ from: '/' });
  const initBalance = useBalanceStore((state) => state.init);
  const authenticated = useAuthStore((state) => state.authenticated);
  const initTransaction = useTransactionStore((state) => state.initTransaction);

  useEffect(() => {
    if (pinValue.length >= 4) {
      setDisableNumberInput(true);
    } else {
      setDisableNumberInput(false);
    }
  }, [pinValue]);

  const inputPressHandler = (value: string) => {
    setPinValue((prev) => prev.concat(value));
  };

  const enterPressHandler = async () => {
    const result = await pinCheck(pinValue);

    const currentBalance = result?.currentBalance;
    if (currentBalance) {
      authenticated();
      initBalance(currentBalance);
      initTransaction(currentBalance);
      navigate({ to: '/atm' });
    }
  };

  const clearPressHandler = () => {
    setPinValue('');
    reset();
  };

  return (
    <>
      <AtmScreenWrapper>
        <div className="my-auto flex flex-col items-center gap-2 p-4">
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
          {pinCheckState === 'error' ? (
            <div className="mt-4 bg-red-300 p-2">Incorrect PIN.</div>
          ) : null}
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput
          onNumberInputPress={inputPressHandler}
          isDisabled={disableNumberInput}
        />
        <AtmActionInput
          onEnterPress={enterPressHandler}
          onClearPress={clearPressHandler}
          hideCancel={true}
          enterLoading={pinCheckState === 'loading'}
        />
      </AtmInputWrapper>
    </>
  );
};
