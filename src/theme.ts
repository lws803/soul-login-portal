import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    soul: {
      pink: { light: '#F72585', dark: '#B5179E' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
