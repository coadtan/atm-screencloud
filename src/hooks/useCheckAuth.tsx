import { useNavigate, useRouter } from '@tanstack/router';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    const url = router.state.location.pathname;

    if (url === '/') {
      if (isAuth) {
        navigate({ to: '/atm' });
      }
    } else {
      if (!isAuth) {
        navigate({ to: '/' });
      }
    }
  }, [navigate, router.state.location, isAuth]);
};
