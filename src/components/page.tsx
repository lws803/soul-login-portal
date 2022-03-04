import React from 'react';
import {
  Center,
  Box,
  VStack,
  Alert,
  AlertIcon,
  HStack,
  Link,
} from '@chakra-ui/react';

export default function Page({
  errors,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Box>
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
      <Center>
        <HStack
          mt={16}
          gap={8}
          borderWidth="1px"
          borderRadius="lg"
          padding="8px 16px"
        >
          <Link
            href="https://github.com/soul-project/login-portal"
            target="_blank"
          >
            Github
          </Link>
          <Link href="https://github.com/soul-project/soul" target="_blank">
            Soul Network&quot;s Github
          </Link>
          <Link href="mailto:lws803@gmail.com" target="_blank">
            Contact me
          </Link>
        </HStack>
      </Center>
    </Box>
  );
}

type Props = {
  errors: string[];
};
