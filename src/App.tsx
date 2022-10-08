import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from './theme';
import RequestEmailVerification from './Pages/RequestEmailVerification';
import RequestPasswordReset from './Pages/RequestPasswordReset';
import EmailConfirmation from './Pages/EmailConfirmation';
import ResetPassword from './Pages/ResetPassword';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          value="dark"
          options={{ initialColorMode: 'dark', useSystemColorMode: false }}
        >
          <BrowserRouter>
            <React.Suspense fallback="">
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
            </React.Suspense>
          </BrowserRouter>
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
