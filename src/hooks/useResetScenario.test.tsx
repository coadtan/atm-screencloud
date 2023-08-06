import { renderHook } from '@testing-library/react';
import { useAuthStore } from '../stores/authStore';
import { useResetScenario } from './useResetScenario';
import { useBalanceStore } from '../stores/balanceStore';
import { useNoteStore } from '../stores/noteStore';
import { useTransactionStore } from '../stores/transactionStore';
import * as routers from '@tanstack/router';

describe('useResetScenario', () => {
  test('should call unauthenticated function', () => {
    const unauthenticated = vi.fn();
    useAuthStore.setState({ unauthenticated: unauthenticated });

    renderHook(() => useResetScenario()).result.current();

    expect(unauthenticated).toHaveBeenCalled();
  });

  test('should call resetBalance function', () => {
    const resetBalance = vi.fn();
    useBalanceStore.setState({ reset: resetBalance });

    renderHook(() => useResetScenario()).result.current();

    expect(resetBalance).toHaveBeenCalled();
  });

  test('should call resetNotes function', () => {
    const resetNotes = vi.fn();

    useNoteStore.setState({ resetNotes: resetNotes });

    renderHook(() => useResetScenario()).result.current();

    expect(resetNotes).toHaveBeenCalled();
  });

  test('should call resetTransaction function', () => {
    const resetTransaction = vi.fn();

    useTransactionStore.setState({ resetTransaction: resetTransaction });

    renderHook(() => useResetScenario()).result.current();

    expect(resetTransaction).toHaveBeenCalled();
  });

  test('should navigate to "/"', () => {
    const navigateSpy = vi.fn();

    vi.spyOn(routers, 'useNavigate').mockImplementation(() => navigateSpy);

    renderHook(() => useResetScenario()).result.current();

    expect(navigateSpy).toHaveBeenCalledWith({ to: '/' });
  });
});
