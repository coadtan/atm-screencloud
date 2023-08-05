import { render } from '@testing-library/react';
import { WithdrawPage } from './WithdrawPage';

vi.mock('../hooks/useCheckAuth');
vi.mock('@tanstack/router');

describe(WithdrawPage, () => {
  test('should display Withdraw Amount', () => {
    const view = render(<WithdrawPage />);

    expect(view.getByText(/Withdraw Amount/i)).toBeDefined();
  });
});
