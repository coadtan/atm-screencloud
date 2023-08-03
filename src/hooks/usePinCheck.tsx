import axios from 'axios';

import { useState } from 'react';

type PinCheckResponse = {
  currentBalance: number;
};

type PinCheckState = 'idle' | 'loading' | 'error' | PinCheckResponse;

export const usePinCheck = () => {
  const [result, setResult] = useState<PinCheckState>('idle');

  const pinCheck = async (pin: string) => {
    setResult('loading');

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

      setResult(res.data);
    } catch (error) {
      setResult('error');
      if (axios.isAxiosError(error)) {
        console.error('pinCheck ~ axios error:', error.response?.data.error);
      } else {
        console.error('pinCheck ~ error:', error);
      }
    }
  };

  return {
    result,
    pinCheck,
  };
};
