import * as routers from '@tanstack/router';
import { render } from '../utils/tests/test-utils';
import { AtmPage } from './AtmPage';
import userEvent from '@testing-library/user-event';

vi.mock('../hooks/useCheckAuth');

describe(AtmPage, () => {
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
  });
});
