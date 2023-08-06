import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { euroFormatter } from '../utils/euroFormatter';
import type { WithdrawStatusType } from '../hooks/useWithdraw';
import { useWithdraw } from '../hooks/useWithdraw';
import { useNavigate } from '@tanstack/router';
import { UserBalance } from '../components/UserBalance';
import { type NoteNumberType } from '../stores/noteStore';

const displayMessageText: Record<WithdrawStatusType, string> = {
  'not-show': '',
  'invalid-amount': 'Invalid amount.',
  'insufficient-withdraw-limit': 'Your overdraft limit has been exceeded.',
  'insufficient-atm-balance': 'The atm has insufficient cash.',
  overdraft: 'You go overdrawn.',
  'available-notes-not-matched':
    'Cannot withdraw the exact amount with available notes.',
};

export const WithdrawPage: React.FC = () => {
  useCheckAuth();
  const navigate = useNavigate();

  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const { withdraw, withdrawStatus, resetWithdrawStatus } = useWithdraw();

  const [receivedNote, setReceivedNote] = useState<NoteNumberType | undefined>(
    undefined,
  );

  const numberInputPressHandler = (value: string) => {
    resetWithdrawStatus();
    setReceivedNote(undefined);
    setWithdrawalAmount((prev) => prev.concat(value));
  };

  const clearInputPressHandler = () => {
    resetWithdrawStatus();
    setWithdrawalAmount('');
    setReceivedNote(undefined);
  };

  const cancelInputPressHandler = () => {
    navigate({ to: '/atm' });
  };

  const enterInputPressHandler = () => {
    const withdrawalAmountNumber = Number(withdrawalAmount);

    const noteUsed = withdraw(withdrawalAmountNumber);

    setReceivedNote(noteUsed);

    setWithdrawalAmount('');
  };

  return (
    <>
      <AtmScreenWrapper>
        <div className="my-auto flex flex-col items-center gap-4 text-center">
          <p>Withdraw Amount</p>
          <p className="w-2/4 border p-4 text-center">
            {euroFormatter.format(Number(withdrawalAmount))}
          </p>
          {withdrawStatus !== 'not-show' && (
            <div
              className={twMerge(
                'mt-4 p-2 text-center',
                withdrawStatus === 'insufficient-withdraw-limit' &&
                  'bg-red-300',
                withdrawStatus === 'insufficient-atm-balance' && 'bg-red-400',
                withdrawStatus === 'available-notes-not-matched' &&
                  'bg-red-400',
                withdrawStatus === 'overdraft' && 'bg-yellow-300',
                withdrawStatus === 'invalid-amount' && 'bg-yellow-300',
              )}
            >
              <p>{displayMessageText[withdrawStatus]}</p>
            </div>
          )}
          {receivedNote && (
            <div className="mt-4 flex flex-col content-center bg-green-100 p-2 py-4 text-center">
              <p>You received:</p>
              {receivedNote.fiveEuroNum > 0 && (
                <p>{receivedNote.fiveEuroNum} of £5</p>
              )}
              {receivedNote.tenEuroNum > 0 && (
                <p>{receivedNote.tenEuroNum} of £10</p>
              )}
              {receivedNote.twentyEuroNum > 0 && (
                <p>{receivedNote.twentyEuroNum} of £20</p>
              )}
            </div>
          )}
        </div>
        <div className="mt-auto text-center">
          <UserBalance />
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput onNumberInputPress={numberInputPressHandler} />
        <AtmActionInput
          onClearPress={clearInputPressHandler}
          onEnterPress={enterInputPressHandler}
          onCancelPress={cancelInputPressHandler}
        />
      </AtmInputWrapper>
    </>
  );
};
