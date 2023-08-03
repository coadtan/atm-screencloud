import { useNavigate, useRouter } from '@tanstack/router';
import { useEffect } from 'react';
import { getAuth } from '../localStorage/atmStorage';

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const url = router.state.location.pathname;

    if (url === '/') {
      if (getAuth()) {
        navigate({ to: '/atm' });
      }
    } else if (url === '/atm') {
      if (!getAuth()) {
        navigate({ to: '/' });
      }
    }
  }, [navigate, router.state.location]);
};
