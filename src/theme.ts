import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    soul: {
      pink: '#F72585',
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
