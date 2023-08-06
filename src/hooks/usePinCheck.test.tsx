import { renderHook, waitFor } from '@testing-library/react';
import { usePinCheck } from './usePinCheck';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

vi.mock('axios');

describe('usePinCheck', () => {
  beforeEach(() => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { currentBalance: 100 },
    });
  });

  test('should return default state as "idle"', () => {
    const view = renderHook(() => usePinCheck());

    expect(view.result.current.pinCheckState).toBe('idle');
  });

  test('should return "loading" state when pinCheck is called', async () => {
    const view = renderHook(() => usePinCheck());

    act(() => {
      view.result.current.pinCheck('1234');
    });

    waitFor(() => expect(view.result.current.pinCheckState).toBe('loading'));
  });

  test('should return "error" state when facing error', async () => {
    vi.spyOn(axios, 'post').mockRejectedValue(new Error('error'));
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const view = renderHook(() => usePinCheck());

    view.result.current.pinCheck('1234');

    waitFor(() => expect(view.result.current.pinCheckState).toBe('error'));
  });

  test('should reset state to "idle" when calling reset', async () => {
    vi.spyOn(axios, 'post').mockRejectedValue(new Error('error'));
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const view = renderHook(() => usePinCheck());

    view.result.current.pinCheck('1234');

    waitFor(() => expect(view.result.current.pinCheckState).toBe('error'));

    view.result.current.reset();

    waitFor(() => expect(view.result.current.pinCheckState).toBe('idle'));
  });

  test('should return currentBalance', async () => {
    const view = renderHook(() => usePinCheck());

    const data = await view.result.current.pinCheck('1234');

    expect(data).toEqual({ currentBalance: 100 });
  });
});
