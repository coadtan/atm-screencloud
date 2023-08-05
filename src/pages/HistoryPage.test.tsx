import { render } from '@testing-library/react';
import { HistoryPage } from './HistoryPage';

vi.mock('@tanstack/router');
vi.mock('../hooks/useCheckAuth');

describe(HistoryPage, () => {
  test('should display "Your transaction history"', () => {
    const view = render(<HistoryPage />);

    expect(view.getByText(/Your transaction history/i)).toBeDefined();
  });
});
