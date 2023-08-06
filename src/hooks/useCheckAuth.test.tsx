import { renderHook } from '@testing-library/react';
import { useCheckAuth } from './useCheckAuth';
import { useAuthStore } from '../stores/authStore';
import * as routers from '@tanstack/router';

describe('useCheckAuth', () => {
  const navigateSpy = vi.fn();
  const routerSpy = vi.fn();

  beforeEach(() => {
    vi.spyOn(routers, 'useNavigate').mockImplementation(() => navigateSpy);
    vi.spyOn(routers, 'useRouter').mockImplementation(routerSpy);
  });

  test('should redirect to "/atm" if user is at root "/" and authenticated', () => {
    useAuthStore.getState().authenticated();
    routerSpy.mockReturnValue({ state: { location: { pathname: '/' } } });

    renderHook(() => useCheckAuth());

    expect(navigateSpy).toHaveBeenCalledWith({ to: '/atm' });
  });

  test('should redirect to "/" if user is unauthenticated', () => {
    useAuthStore.getState().unauthenticated();
    routerSpy.mockReturnValue({ state: { location: { pathname: '/atm' } } });

    renderHook(() => useCheckAuth());

    expect(navigateSpy).toHaveBeenCalledWith({ to: '/' });
  });
});
