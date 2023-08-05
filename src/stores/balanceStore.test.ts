import { test } from 'vitest';
import { useBalanceStore } from './balanceStore';

describe('balanceStore', () => {
  test('should have default balance as 0', () => {
    const currentBalance = useBalanceStore.getState().currentBalance;

    expect(currentBalance).toBe(0);
  });

  test('should init balance to any amount', () => {
    useBalanceStore.getState().init(100);

    const currentBalance = useBalanceStore.getState().currentBalance;

    expect(currentBalance).toBe(100);
  });

  test('should reset balance to 0 regardless of the amount', () => {
    useBalanceStore.getState().init(100);
    useBalanceStore.getState().reset();

    const currentBalance = useBalanceStore.getState().currentBalance;

    expect(currentBalance).toBe(0);
  });

  test('should reduce the balance when withdraw', () => {
    useBalanceStore.getState().init(100);
    useBalanceStore.getState().withdraw(50);

    const currentBalance = useBalanceStore.getState().currentBalance;

    expect(currentBalance).toBe(50);
  });

  test('should return current balance', () => {
    useBalanceStore.getState().init(100);
    const currentBalance = useBalanceStore.getState().getCurrentBalance();

    expect(currentBalance).toBe(100);
  });
});
