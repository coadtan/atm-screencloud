import { RootRoute, Route, Router } from '@tanstack/router';

import { RootLayout } from './layout/RootLayout';
import { LoginPage } from './pages/LoginPage';
import { AtmPage } from './pages/AtmPage';

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

const routeTree = rootRoute.addChildren([atmRoute, loginRoute]);

export const router = new Router({ routeTree });

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
