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
  config,
};

export const customTheme: ThemeOverride = extendTheme(theme);
