import { RootRoute, Route, Router } from '@tanstack/router';

import { RootLayout } from './layout/RootLayout';
import { LoginPage } from './pages/LoginPage';
import { AtmPage } from './pages/AtmPage';
import { WithdrawPage } from './pages/WithdrawPage';

const rootRoute = new RootRoute({
  component: RootLayout,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginPage,
});

const atmRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/atm',
  component: AtmPage,
});

const withDrawRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/withdraw',
  component: WithdrawPage,
});

const routeTree = rootRoute.addChildren([atmRoute, loginRoute, withDrawRoute]);

export const router = new Router({ routeTree });

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
