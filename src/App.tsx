import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import LoggingIn from './components/logging-in';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logging-in" element={<LoggingIn />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
