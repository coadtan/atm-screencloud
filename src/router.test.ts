import { LoginPage } from './pages/LoginPage';
import { AtmPage } from './pages/AtmPage';
import { router } from './router';

describe('router', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should return LoginPage for "/" path', () => {
    const path = '/';

    const paths = router.routesByPath;
    const component = paths[path].options.component;

    expect(component).toBe(LoginPage);
  });

  test('should return AtmPage for "/atm" path', () => {
    const path = '/atm';

    const paths = router.routesByPath;
    const component = paths[path].options.component;

    expect(component).toBe(AtmPage);
  });
});
