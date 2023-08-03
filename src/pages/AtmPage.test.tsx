import { render } from '@testing-library/react';

import { AtmPage } from './AtmPage';

describe(AtmPage, () => {
  test('should display AtmPage', () => {
    const view = render(<AtmPage />);

    expect(view.getByText(/AtmPage/i)).toBeDefined();
  });
});
