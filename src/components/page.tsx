import React from 'react';
import { Center, Box, VStack, Alert, AlertIcon } from '@chakra-ui/react';

export default function Page({
  errors,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Center>
      <Box p={8} width={500}>
        {children}
        <VStack spacing={2} mt={8}>
          {errors.length > 0 &&
            errors.map((error) => (
              <Alert status="error" variant="solid" bgColor="red.500">
                <AlertIcon />
                {error}
              </Alert>
            ))}
        </VStack>
      </Box>
    </Center>
  );
}

type Props = {
  errors: string[];
};
