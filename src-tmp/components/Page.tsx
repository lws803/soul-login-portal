import React from 'react';
import { Box, VStack, Alert, AlertIcon } from '@chakra-ui/react';

import Footer from './Page/Footer';

export default function Page({
  errors,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Box>
      <Box paddingTop="40px" minHeight="100vh">
        <Box p={8} maxWidth="500px" marginLeft="auto" marginRight="auto">
          {children}
          <VStack spacing={2} mt={8}>
            {errors.length > 0 &&
              errors.map((error) => (
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
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

type Props = {
  errors: string[];
};
