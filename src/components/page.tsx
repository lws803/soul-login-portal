import React from 'react';
import { Center, Box, Text } from '@chakra-ui/react';

export default function Page({
  errors,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Center>
      <Box p={8} width={500}>
        {children}
        {errors.length > 0 &&
          errors.map((error) => (
            <Text marginTop={8} textColor="red.600" fontSize="lg" key={error}>
              {error}
            </Text>
          ))}
      </Box>
    </Center>
  );
}

type Props = {
  errors: string[];
};
