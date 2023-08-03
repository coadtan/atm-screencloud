import axios from 'axios';

type PinCheckResponse = {
  currentBalance: number;
};

export const pinCheck = async (pin: string) => {
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

    console.log(
      '🚀 ~ file: pinCheck.ts:27 ~ pinCheck ~ res.data.currentBalance:',
      res.data.currentBalance,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('pinCheck ~ axios error:', error.response?.data.error);
    } else {
      console.error('pinCheck ~ error:', error);
    }
  }
};
