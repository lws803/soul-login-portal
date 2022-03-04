import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    soul: {
      pink: { light: '#F72585', dark: '#B5179E', 200: '#F72585' },
      green: { 200: '#02DE7B' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
