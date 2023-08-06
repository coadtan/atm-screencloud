import { render } from '@testing-library/react';
import { HistoryPage } from './HistoryPage';
import { useTransactionStore } from '../stores/transactionStore';

vi.mock('../hooks/useCheckAuth');
vi.mock('../utils/formatTime', () => ({
  formatTime: () => '00:00:00',
}));

describe(HistoryPage, () => {
  test('should display "Your transaction history"', () => {
    const view = render(<HistoryPage />);

    expect(view.getByText(/Your transaction history/i)).toBeDefined();
  });

  test('should display initial balance', () => {
    useTransactionStore.getState().initTransaction(200);

    const view = render(<HistoryPage />);

    const initBalanceRow = view.getByRole('row', { name: /200/i });

    expect(initBalanceRow).toBeDefined();
  });

  test('should display transaction row', () => {
    const someDate = new Date();

    useTransactionStore.getState().addTransaction({
      amount: 200,
      isInitBalance: false,
      balance: 300,
      when: someDate,
    });

    const view = render(<HistoryPage />);

    const transactionAmountRow = view.getByRole('row', { name: /200/i });
    const transactionBalanceRow = view.getByRole('row', { name: /300/i });
    const transactionWhenRow = view.getByRole('row', { name: /00:00:00/i });

    expect(transactionAmountRow).toBeDefined();
    expect(transactionBalanceRow).toBeDefined();
    expect(transactionWhenRow).toBeDefined();
  });
});
