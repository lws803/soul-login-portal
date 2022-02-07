import { ChakraProvider } from '@chakra-ui/react';

import Main from './components/main';

import './style';

export default function App() {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  );
}
