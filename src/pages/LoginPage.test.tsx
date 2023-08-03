import { render } from '@testing-library/react';

import { LoginPage } from './LoginPage';

describe(LoginPage, () => {
  test('should display LoginPage', () => {
    const view = render(<LoginPage />);

    expect(view.getByText(/LoginPage/i)).toBeDefined();
  });
});
