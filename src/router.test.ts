import { LoginPage } from './pages/LoginPage';
import { AtmPage } from './pages/AtmPage';
import { router } from './router';
import { WithdrawPage } from './pages/WithdrawPage';
import { HistoryPage } from './pages/HistoryPage';

describe('router', () => {
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

  test('should return WithdrawPage for "/withdraw" path', () => {
    const path = '/withdraw';

    const paths = router.routesByPath;
    const component = paths[path].options.component;

    expect(component).toBe(WithdrawPage);
  });

  test('should return HistoryPage for "/history" path', () => {
    const path = '/history';

    const paths = router.routesByPath;
    const component = paths[path].options.component;

    expect(component).toBe(HistoryPage);
  });
});
