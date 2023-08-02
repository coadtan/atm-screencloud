import { render } from '@testing-library/react';

import App from './App';

describe(App, () => {
    test('should display Hello World', () => {
        const view = render(<App />);

        expect(view.getByText(/Hello World/i)).toBeDefined();
    });
});
