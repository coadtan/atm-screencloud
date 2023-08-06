import { renderHook, waitFor } from '@testing-library/react';
import { useWithdraw } from './useWithdraw';
import { act } from 'react-dom/test-utils';
import { useNoteStore } from '../stores/noteStore';
import { useBalanceStore } from '../stores/balanceStore';
import { useTransactionStore } from '../stores/transactionStore';

describe('useWithdraw', () => {
  describe('state', () => {
    test('should return default state as "not-show"', () => {
      const view = renderHook(() => useWithdraw());

      expect(view.result.current.withdrawStatus).toBe('not-show');
    });

    test('should reset state to "not-show" when calling resetWithdrawStatus', async () => {
      const view = renderHook(() => useWithdraw());

      act(() => {
        view.result.current.withdraw(-1);
      });

      await waitFor(() =>
        expect(view.result.current.withdrawStatus).toBe('invalid-amount'),
      );

      act(() => {
        view.result.current.resetWithdrawStatus();
      });

      await waitFor(() =>
        expect(view.result.current.withdrawStatus).toBe('not-show'),
      );
    });
  });

  describe('withdraw', () => {
    test('should return "invalid-amount" state if withdraw amount is < 0', async () => {
      const view = renderHook(() => useWithdraw());

      act(() => {
        view.result.current.withdraw(-1);
      });

      await waitFor(() =>
        expect(view.result.current.withdrawStatus).toBe('invalid-amount'),
      );
    });

    test('should return "invalid-amount" state if withdraw amount is = 0', async () => {
      const view = renderHook(() => useWithdraw());

      act(() => {
        view.result.current.withdraw(0);
      });

      await waitFor(() =>
        expect(view.result.current.withdrawStatus).toBe('invalid-amount'),
      );
    });

    test('should return "insufficient-atm-balance" state if withdraw amount is greater than atm balance', async () => {
      useNoteStore.setState({
        getRemainingAtmBalance: () => 500,
      });

      const view = renderHook(() => useWithdraw());

      act(() => {
        view.result.current.withdraw(99999);
      });

      await waitFor(() =>
        expect(view.result.current.withdrawStatus).toBe(
          'insufficient-atm-balance',
        ),
      );
    });

    test('should return "insufficient-withdraw-limit" state if overdrawn more than 100', async () => {
      useNoteStore.setState({
        getRemainingAtmBalance: () => 200,
      });

      useBalanceStore.setState({
        getCurrentBalance: () => 99,
        currentBalance: 99,
      });

      const view = renderHook(() => useWithdraw());

      act(() => {
        view.result.current.withdraw(200);
      });

      await waitFor(() =>
        expect(view.result.current.withdrawStatus).toBe(
          'insufficient-withdraw-limit',
        ),
      );
    });

    test('should return "available-notes-not-matched" state if there is not enough notes to give', async () => {
      /**
       * @see initialState in src/stores/noteStore.ts
       * Notes is initial as:
       *
       * fiveEuroNum: 4,
       * tenEuroNum: 15,
       * twentyEuroNum: 7,
       */

      useNoteStore.setState({
        getRemainingAtmBalance: () => 310,
      });

      useBalanceStore.setState({
        getCurrentBalance: () => 220,
        currentBalance: 220,
      });

      const view = renderHook(() => useWithdraw());

      act(() => {
        view.result.current.withdraw(219);
      });

      await waitFor(() =>
        expect(view.result.current.withdrawStatus).toBe(
          'available-notes-not-matched',
        ),
      );
    });

    describe('withdraw successful', () => {
      test('should return "overdraft" state if overdrawn but is in 100 limit', async () => {
        useNoteStore.setState({
          getRemainingAtmBalance: () => 500,
        });

        useBalanceStore.setState({
          getCurrentBalance: () => 100,
          currentBalance: 100,
        });

        const view = renderHook(() => useWithdraw());

        act(() => {
          view.result.current.withdraw(200);
        });

        await waitFor(() =>
          expect(view.result.current.withdrawStatus).toBe('overdraft'),
        );
      });

      test('should decrease remaining notes in the ATM once withdrawal is successful', async () => {
        /**
         * @see initialState in src/stores/noteStore.ts
         * Notes is initial as:
         *
         * fiveEuroNum: 4,
         * tenEuroNum: 15,
         * twentyEuroNum: 7,
         */

        useNoteStore.setState({
          getRemainingAtmBalance: () => 310,
        });

        useBalanceStore.setState({
          getCurrentBalance: () => 220,
          currentBalance: 220,
        });

        const view = renderHook(() => useWithdraw());

        act(() => {
          view.result.current.withdraw(140);
        });

        const noteNumber = useNoteStore.getState().noteNumber;

        expect(noteNumber).toEqual({
          fiveEuroNum: 0,
          tenEuroNum: 11,
          twentyEuroNum: 3,
        });
      });

      test('should decrease user balance once withdrawal is successful', async () => {
        useNoteStore.setState({
          getRemainingAtmBalance: () => 310,
        });

        useBalanceStore.setState({
          currentBalance: 220,
        });

        const view = renderHook(() => useWithdraw());

        act(() => {
          view.result.current.withdraw(140);
        });

        const remainingBalance = useBalanceStore.getState().getCurrentBalance();

        expect(remainingBalance).toBe(80);
      });

      test('should add transaction once withdrawal is successful', async () => {
        vi.useFakeTimers();

        const date = new Date('2020-12-31T17:00:00.000Z');

        vi.setSystemTime(date);
        useNoteStore.setState({
          getRemainingAtmBalance: () => 310,
        });

        useBalanceStore.setState({
          currentBalance: 220,
        });

        const view = renderHook(() => useWithdraw());

        act(() => {
          view.result.current.withdraw(140);
        });

        const transactions = useTransactionStore.getState().transactionList;

        expect(transactions).toEqual([
          {
            amount: 140,
            balance: 80,
            isInitBalance: false,
            when: new Date('2020-12-31T17:00:00.000Z'),
          },
        ]);

        vi.useRealTimers();
      });
    });
  });
});
