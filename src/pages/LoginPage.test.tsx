import { render } from '@testing-library/react';

import { LoginPage } from './LoginPage';

vi.mock('../hooks/useCheckAuth');

describe(LoginPage, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should display Enter Your Pin', () => {
    const view = render(<LoginPage />);

    expect(view.getByText(/Enter Your Pin/i)).toBeDefined();
  });
});
