import { useState, useMemo } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import LoginForm from './login-form/login-form';

export default function Login() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Center>
      <Box p={8} width={500}>
        <LoginForm
          setErrors={setErrors}
          callback={query.get('callback')!}
          platformId={parseInt(query.get('platformId')!, 10)}
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

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
