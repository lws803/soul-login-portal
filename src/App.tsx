import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import LoggingIn from './pages/logging-in';
import Login from './pages/login';
import Register from './pages/register';
import EmailConfirmation from './pages/email-confirmation';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logging-in" element={<LoggingIn />} />
          <Route path="/verify-email" element={<EmailConfirmation />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
