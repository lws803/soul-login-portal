import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Login from './Pages/Login';
import Register from './Pages/Register';
import EmailConfirmation from './Pages/EmailConfirmation';
import ResetPassword from './Pages/ResetPassword';
import RequestPasswordReset from './Pages/RequestPasswordReset';
import RequestEmailVerification from './Pages/RequestEmailVerification';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<EmailConfirmation />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/request-password-reset"
            element={<RequestPasswordReset />}
          />
          <Route
            path="/request-email-verification"
            element={<RequestEmailVerification />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
