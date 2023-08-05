import { render } from '@testing-library/react';
import { HistoryPage } from './HistoryPage';

vi.mock('@tanstack/router');
vi.mock('../hooks/useCheckAuth');

describe(HistoryPage, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should display HistoryPage', () => {
    const view = render(<HistoryPage />);

    expect(view.getByText(/HistoryPage/i)).toBeDefined();
  });
});
