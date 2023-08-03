const BALANCE_STORAGE_KEY = 'user-balance';
const AUTH_STORAGE_KEY = 'isAuth';

export const getBalance = (): number | null => {
  const balance = localStorage.getItem(BALANCE_STORAGE_KEY);
  if (balance) {
    return Number(balance);
  }

  return null;
};

export const setBalance = (balance: number): void => {
  localStorage.setItem(BALANCE_STORAGE_KEY, balance.toString());
};

export const getAuth = (): boolean => {
  const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY);
  if (isAuthenticated === 'true') {
    return true;
  }

  return false;
};

export const setAuth = (isAuthenticated: boolean): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated.toString());
};
