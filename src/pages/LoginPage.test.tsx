import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as routers from '@tanstack/router';

import { LoginPage } from './LoginPage';
import { usePinCheck } from '../hooks/usePinCheck';
import { useBalanceStore } from '../stores/balanceStore';
import { useTransactionStore } from '../stores/transactionStore';
import { useAuthStore } from '../stores/authStore';

vi.mock('../hooks/useCheckAuth');
vi.mock('../hooks/usePinCheck');

describe(LoginPage, () => {
  const pinCheckSpy = vi.fn();
  const navigateSpy = vi.fn();

  beforeEach(() => {
    vi.spyOn(routers, 'useNavigate').mockImplementation(() => navigateSpy);
    vi.mocked(usePinCheck).mockImplementation(() => ({
      pinCheck: pinCheckSpy,
      pinCheckState: 'idle',
      reset: vi.fn(),
    }));
  });

  test('should display Enter Your Pin', () => {
    const view = render(<LoginPage />);

    expect(view.getByText(/Enter Your Pin/i)).toBeDefined();
  });

  test('should insert pin when pressed number input', async () => {
    const user = userEvent.setup();

    const view = render(<LoginPage />);

    const oneButton = view.getByRole('button', { name: /1/i });
    const twoButton = view.getByRole('button', { name: /2/i });

    await user.click(oneButton);
    await user.click(twoButton);
    await user.click(oneButton);
    await user.click(twoButton);

    const pinInput = view.getAllByPlaceholderText(/○/i);

    expect(pinInput[0]).toHaveValue('1');
    expect(pinInput[1]).toHaveValue('2');
    expect(pinInput[2]).toHaveValue('1');
    expect(pinInput[3]).toHaveValue('2');
  });

  test('should display Incorrect Pin when pin does not match', async () => {
    vi.mocked(usePinCheck).mockImplementation(() => ({
      pinCheck: () => Promise.resolve(undefined),
      pinCheckState: 'error',
      reset: vi.fn(),
    }));

    const view = render(<LoginPage />);

    expect(view.getByText(/Incorrect Pin/i)).toBeDefined();
  });

  describe('Login success', () => {
    const balanceFromAPI = 220;

    beforeEach(() => {
      vi.mocked(usePinCheck).mockImplementation(() => ({
        pinCheck: () => Promise.resolve({ currentBalance: balanceFromAPI }),
        pinCheckState: 'success',
        reset: vi.fn(),
      }));
    });

    test('should navigate to atm page when pin is matched', async () => {
      const user = userEvent.setup();

      const view = render(<LoginPage />);

      const enterButton = view.getByRole('button', { name: /ENTER/i });

      await user.click(enterButton);

      expect(navigateSpy).toHaveBeenCalledWith({ to: '/atm' });
    });

    test('should initial balance to the balance returned from API', async () => {
      const user = userEvent.setup();

      const view = render(<LoginPage />);

      const enterButton = view.getByRole('button', { name: /ENTER/i });

      await user.click(enterButton);

      expect(useBalanceStore.getState().currentBalance).toBe(balanceFromAPI);
    });

    test('should initial transaction to the balance returned from API', async () => {
      const user = userEvent.setup();

      const view = render(<LoginPage />);

      const enterButton = view.getByRole('button', { name: /ENTER/i });

      await user.click(enterButton);

      expect(
        useTransactionStore.getState().transactionList[0].isInitBalance,
      ).toBe(true);
      expect(useTransactionStore.getState().transactionList[0].balance).toBe(
        balanceFromAPI,
      );
    });

    test('should set isAuth to be true', async () => {
      const user = userEvent.setup();

      const view = render(<LoginPage />);

      const enterButton = view.getByRole('button', { name: /ENTER/i });

      await user.click(enterButton);

      expect(useAuthStore.getState().isAuth).toBe(true);
    });
  });
});
