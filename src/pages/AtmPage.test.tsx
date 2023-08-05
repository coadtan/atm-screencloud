import { render } from '@testing-library/react';

import { AtmPage } from './AtmPage';

vi.mock('@tanstack/router');
vi.mock('../hooks/useCheckAuth');

describe(AtmPage, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should display AtmPage', () => {
    const view = render(<AtmPage />);

    expect(view.getByText(/AtmPage/i)).toBeDefined();
  });
});
