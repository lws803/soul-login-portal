import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { BASE_URL } from '../../constants';

export default function Form({ token, setErrors, setIsSuccess }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      setErrors([]);
      setIsResetting(true);
      // TODO: refactor this one out
      axios
        .post(`${BASE_URL}/v1/users/password-reset?token=${token}`, values)
        .then(() => setIsSuccess(true))
        .catch(({ response: { data, status } }) => {
          if (status === 400 && data.error === 'VALIDATION_ERROR') {
            formik.setErrors({
              password: 'Password is too weak!',
            });
          } else {
            setErrors([data.message]);
          }
        })
        .finally(() => {
          setIsResetting(false);
        });
    },
    validationSchema: Yup.object({
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  });

  return (
    <form onSubmit={(e) => formik.handleSubmit(e as any)}>
      <FormControl
        isInvalid={!!formik.errors.password && formik.touched.password}
      >
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          disabled={!token}
          aria-label="Password input"
        />
        {formik.errors.password && (
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        )}
      </FormControl>
      <HStack mt={8}>
        <Button
          type="submit"
          isLoading={isResetting}
          disabled={!token}
          bg="soul.pink.light"
          _hover={{ bg: 'soul.pink.dark' }}
          _active={{ bg: 'soul.pink.dark' }}
          width="100%"
        >
          Reset password
        </Button>
      </HStack>
    </form>
  );
}

type Props = {
  setErrors: (error: string[]) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  token?: string | null;
};
