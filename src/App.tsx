import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';

import theme from './theme';

const Login = React.lazy(() => import('./Pages/Login'));
const Register = React.lazy(() => import('./Pages/Register'));
const EmailConfirmation = React.lazy(() => import('./Pages/EmailConfirmation'));
const ResetPassword = React.lazy(() => import('./Pages/ResetPassword'));
const RequestPasswordReset = React.lazy(
  () => import('./Pages/RequestPasswordReset'),
);
const RequestEmailVerification = React.lazy(
  () => import('./Pages/RequestEmailVerification'),
);

function App() {
  return (
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
  );
}

export default App;
