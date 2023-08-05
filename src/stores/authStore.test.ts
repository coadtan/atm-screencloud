import { useAuthStore } from './authStore';

describe('authStore', () => {
  test('should have default isAuth as false', () => {
    const isAuth = useAuthStore.getState().isAuth;

    expect(isAuth).toBe(false);
  });

  test('should set isAuth to true when authenticated', () => {
    useAuthStore.setState({ isAuth: false });
    useAuthStore.getState().authenticated();

    const isAuth = useAuthStore.getState().isAuth;

    expect(isAuth).toBe(true);
  });

  test('should set isAuth to false when unauthenticated', () => {
    useAuthStore.setState({ isAuth: true });
    useAuthStore.getState().unauthenticated();

    const isAuth = useAuthStore.getState().isAuth;

    expect(isAuth).toBe(false);
  });
});
