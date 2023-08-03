import {
  extendTheme,
  type ThemeOverride,
  type ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme: ThemeOverride = {
  fonts: {
    heading: `'Chakra Petch', sans-serif`,
    body: `'Chakra Petch', sans-serif`,
  },
  config,
};

export const customTheme: ThemeOverride = extendTheme(theme);
