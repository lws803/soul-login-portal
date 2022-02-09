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

export default function Form({ token, setErrors }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      setErrors([]);
      setIsResetting(true);
      axios
        .post(`${BASE_URL}/v1/users/password-reset?token=${token}`, values)
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
        />
        {formik.errors.password && (
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        )}
      </FormControl>
      <HStack mt={8}>
        <Button
          colorScheme="teal"
          type="submit"
          isLoading={isResetting}
          disabled={!token}
        >
          Reset password
        </Button>
      </HStack>
    </form>
  );
}

type Props = {
  setErrors: (error: string[]) => void;
  token?: string | null;
};
