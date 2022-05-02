import React from 'react';
import { Box, VStack, Alert, AlertIcon } from '@chakra-ui/react';

import Footer from './Page/Footer';

export default function Page({
  errors,
  children,
  title,
}: React.PropsWithChildren<Props>) {
  return (
    <Box>
      <Box paddingTop="40px" minHeight="100vh">
        <Box p={8} maxWidth="500px" marginLeft="auto" marginRight="auto">
          {title}
          {errors.length > 0 && (
            <VStack spacing={2} mb="32px">
              {errors.map((error) => (
                <Alert
                  status="error"
                  variant="solid"
                  bgColor="red.500"
                  key={error}
                >
                  <AlertIcon />
                  {error}
                </Alert>
              ))}
            </VStack>
          )}

          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

type Props = {
  errors: string[];
  title?: React.ReactNode;
};
