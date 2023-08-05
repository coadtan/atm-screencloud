import { render } from '@testing-library/react';
import { WithdrawPage } from './WithdrawPage';

vi.mock('../hooks/useCheckAuth');

describe(WithdrawPage, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should display Withdraw', () => {
    const view = render(<WithdrawPage />);

    expect(view.getByText(/Withdraw/i)).toBeDefined();
  });
});
