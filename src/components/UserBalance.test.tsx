import { render } from '@testing-library/react';
import { UserBalance } from './UserBalance';
import { useBalanceStore } from '../stores/balanceStore';

describe(UserBalance, () => {
  test('should render user balance', () => {
    useBalanceStore.setState({ currentBalance: 100 });

    const view = render(<UserBalance />);

    const currentBalance = view.getByText(/Your balance:/);

    expect(currentBalance).toHaveTextContent('£100');
  });

  test('should display an overdrawn message when the current balance is negative', () => {
    useBalanceStore.setState({ currentBalance: -1 });

    const view = render(<UserBalance />);

    const overdrawnMessage = view.getByText(/overdrawn/);

    expect(overdrawnMessage).toBeInTheDocument();
  });
});
