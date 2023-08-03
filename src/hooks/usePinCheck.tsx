import axios from 'axios';

import { useState } from 'react';

type PinCheckResponse = {
  currentBalance: number;
};

type PinCheckState = 'idle' | 'loading' | 'error' | 'success';

export const usePinCheck = () => {
  const [pinCheckState, setPinCheckState] = useState<PinCheckState>('idle');

  const reset = () => {
    setPinCheckState('idle');
  };

  const pinCheck = async (pin: string): Promise<PinCheckResponse | void> => {
    if (pin.length != 4) {
      setPinCheckState('error');
      return;
    }

    setPinCheckState('loading');

    try {
      const res = await axios.post<PinCheckResponse>(
        import.meta.env.VITE_PUBLIC_API_URL,
        {
          pin: pin,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      setPinCheckState('success');
      return res.data;
    } catch (error) {
      setPinCheckState('error');
      if (!axios.isAxiosError(error)) {
        console.error('pinCheck ~ error:', error);
      }
    }
  };

  return {
    pinCheckState,
    pinCheck,
    reset,
  };
};
