import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import LoggingIn from './components/logging-in';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logging-in" element={<LoggingIn />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
