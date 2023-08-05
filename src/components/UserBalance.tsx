import React from 'react';
import { useBalanceStore } from '../stores/balanceStore';
import { euroFormatter } from '../utils/euroFormatter';

export const UserBalance: React.FC = () => {
  const currentBalance = useBalanceStore((state) => state.currentBalance);

  return (
    <div className="flex flex-col">
      <p>
        Your balance: {euroFormatter.format(Number(currentBalance))}{' '}
        {currentBalance < 0 && (
          <span className="rounded bg-yellow-300 px-1 text-sm italic">
            overdrawn
          </span>
        )}
      </p>
    </div>
  );
};
