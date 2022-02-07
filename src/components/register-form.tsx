import { useState } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

import Register from './register-form/register';

export default function RegisterForm() {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Center>
      <Box p={8} width={500}>
        <Register setErrors={setErrors} />
        {errors.length > 0 &&
          errors.map((error) => (
            <Text marginTop={8} textColor="red.600" fontSize="lg">
              {error}
            </Text>
          ))}
      </Box>
    </Center>
  );
}