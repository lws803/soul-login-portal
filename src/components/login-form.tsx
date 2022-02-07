import { useState } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

import Login from './login-form/login';

export default function LoginForm() {
  const { callback, platformId } = useQueryParams();
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Center>
      <Box p={8} width={500}>
        <Login
          setErrors={setErrors}
          callback={callback}
          platformId={parseInt(platformId, 10)}
        />
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

const useQueryParams = (): Record<string, string> => {
  const result: Record<string, string> = {};
  const search = typeof window !== 'undefined' ? window.location.search : '';
  new URLSearchParams(search).forEach((value, key) => {
    result[key] = value;
  });
  return result;
};
