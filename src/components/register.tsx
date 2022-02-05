import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  HStack,
  Button,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import { BASE_URL } from '../constants';

export default function Register({ setError, setFormState }: Props) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: (values) => {
      setError(undefined);
      axios
        .post(`${BASE_URL}/v1/users`, values)
        .then(({ data }) => {
          if (data.id) {
            setFormState('login');
          }
        })
        .catch(({ response: { data, status } }) => {
          if (status === 400 && data.error === 'VALIDATION_ERROR') {
            setError('Password is too weak!');
          } else {
            setError(data.message);
          }
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  });

  return (
    <form onSubmit={(e) => formik.handleSubmit(e as any)}>
      <FormControl
        isInvalid={!!formik.errors.username && formik.touched.username}
      >
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {!formik.errors.email && (
          <FormHelperText>Choose an awesome username!</FormHelperText>
        )}
        {formik.errors.username && (
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl
        isInvalid={!!formik.errors.email && formik.touched.email}
        marginTop={8}
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {!formik.errors.email && (
          <FormHelperText>We'll never share your email.</FormHelperText>
        )}
        {formik.errors.email && (
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        isInvalid={!!formik.errors.password && formik.touched.password}
        marginTop={8}
      >
        {/* TODO: Add password checker, with complexity indicator */}
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        )}
      </FormControl>
      <HStack mt={8}>
        <Button colorScheme="teal" type="submit">
          Register
        </Button>
      </HStack>
    </form>
  );
}

type Props = {
  setError: (error: string | undefined) => void;
  setFormState: (state: 'login') => void;
};
