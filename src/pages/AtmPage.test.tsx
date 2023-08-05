import * as routers from '@tanstack/router';
import { render } from '../utils/tests/test-utils';
import { AtmPage } from './AtmPage';
import userEvent from '@testing-library/user-event';
import { useBalanceStore } from '../stores/balanceStore';
import { waitFor } from '@testing-library/dom';
import { useResetScenario } from '../hooks/useResetScenario';

vi.mock('../hooks/useCheckAuth');
vi.mock('../hooks/useResetScenario');

describe(AtmPage, () => {
  describe('display on screen', () => {
    test('should display Withdraw button', () => {
      const view = render(<AtmPage />);

      const withdrawButton = view.getByRole('button', { name: /Withdraw/i });

      expect(withdrawButton).toBeDefined();
    });

    test('should display History button', () => {
      const view = render(<AtmPage />);

      const historyButton = view.getByRole('button', { name: /History/i });

      expect(historyButton).toBeDefined();
    });

    test('should display current balance from store', () => {
      useBalanceStore.setState({ currentBalance: 220 });

      const view = render(<AtmPage />);

      expect(view.getByText(/Your balance: £220/i)).toBeDefined();
    });

    test('should display Logging Out dialog when press "CANCEL"', async () => {
      const user = userEvent.setup();

      const view = render(<AtmPage />);

      const cancelButton = view.getByRole('button', { name: /CANCEL/i });

      await user.click(cancelButton);

      expect(view.getByText(/Logging Out/i)).toBeDefined();
    });
  });

  describe('navigation', () => {
    const navigateSpy = vi.fn();

    beforeEach(() => {
      vi.spyOn(routers, 'useNavigate').mockImplementation(() => navigateSpy);
    });

    test('should go to withdraw page when click Withdraw button', async () => {
      const user = userEvent.setup();

      const view = render(<AtmPage />);

      const withdrawButton = view.getByRole('button', { name: /Withdraw/i });

      await user.click(withdrawButton);

      expect(navigateSpy).toHaveBeenCalledWith({ to: '/withdraw' });
    });

    test('should go to History page when click History button', async () => {
      const user = userEvent.setup();

      const view = render(<AtmPage />);

      const withdrawButton = view.getByRole('button', { name: /History/i });

      await user.click(withdrawButton);

      expect(navigateSpy).toHaveBeenCalledWith({ to: '/history' });
    });

    test('should reset scenario when click "Logout" in Logging Out dialog', async () => {
      const resetScenarioSpy = vi.fn();
      vi.mocked(useResetScenario).mockImplementation(() => resetScenarioSpy);

      const user = userEvent.setup();

      const view = render(<AtmPage />);

      const cancelButton = view.getByRole('button', { name: /CANCEL/i });

      await user.click(cancelButton);

      waitFor(() => expect(view.getByText(/Logging Out/i)).toBeDefined());

      const logoutButton = view.getByRole('button', { name: /Logout/i });

      await user.click(logoutButton);

      expect(resetScenarioSpy).toHaveBeenCalled();
    });
  });
});
