import { useState } from 'preact/hooks';
import { Box, Center, Text } from '@chakra-ui/react';

import Login from './login';
import Register from './register';

export default function FormWrapper() {
  const { callback, platformId } = useQueryParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormStates>('login');

  return (
    <Center>
      <Box p={8} width={500}>
        {formState === 'login' ? (
          <Login
            setErrors={setErrors}
            setFormState={setFormState}
            callback={callback}
            platformId={parseInt(platformId, 10)}
          />
        ) : (
          <Register setFormState={setFormState} setErrors={setErrors} />
        )}
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

type FormStates = 'login' | 'register';
