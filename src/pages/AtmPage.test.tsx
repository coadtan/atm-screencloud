import { render } from '@testing-library/react';

import { AtmPage } from './AtmPage';

vi.mock('@tanstack/router');
vi.mock('../hooks/useCheckAuth');

describe(AtmPage, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should display Withdraw', () => {
    const view = render(<AtmPage />);

    expect(view.getByText(/Withdraw/i)).toBeDefined();
  });

  test('should display History', () => {
    const view = render(<AtmPage />);

    expect(view.getByText(/History/i)).toBeDefined();
  });
});
