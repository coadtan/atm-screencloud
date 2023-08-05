import React from 'react';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { useNavigate } from '@tanstack/router';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useTransactionStore } from '../stores/transactionStore';

export const HistoryPage: React.FC = () => {
  useCheckAuth();

  const navigate = useNavigate();
  const transactionList = useTransactionStore((state) => state.transactionList);

  const cancelInputPressHandler = () => {
    navigate({ to: '/atm' });
  };

  return (
    <>
      <AtmScreenWrapper>
        <div>Your transaction history</div>
        <table className="mt-4 text-left">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="px-6 "
              >
                When
              </th>
              <th
                scope="col"
                className="px-6 "
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 "
              >
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map((transaction) => (
              <tr
                className="border-b"
                key={transaction.when.toUTCString()}
              >
                {transaction.isInitBalance ? (
                  <>
                    <td className="px-6"></td>
                    <td className="px-6 "></td>
                    <td className="px-6 ">{transaction.balance}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6">{transaction.when.toUTCString()}</td>
                    <td className="px-6 ">{transaction.amount}</td>
                    <td className="px-6 ">{transaction.balance}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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
