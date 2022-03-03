import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';

import { register } from './api';
import FancyButton from '../../components/fancy-button';
// import RegisterButton from './form/register-button';

export default function Form({ setErrors }: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [isRegistering, setIsRegistering] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: async (values) => {
      setErrors([]);
      setIsRegistering(true);

      const { data, error } = await register({ values });
      if (error) {
        if (error.status === 400 && error.data.error === 'VALIDATION_ERROR') {
          formik.setErrors({
            password: 'Password is too weak!',
          });
        } else if (error.status === 409) {
          formik.setErrors({ email: error.data.message });
        } else {
          setErrors([error.data.message]);
        }
      }
      if (data?.id) {
        navigate(`/${search}`);
      }
      setIsRegistering(false);
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
          aria-label="Username input"
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
          aria-label="Email input"
        />
        {!formik.errors.email && (
          <FormHelperText>We&apos;ll never share your email.</FormHelperText>
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
          aria-label="Password input"
        />
        {formik.errors.password && (
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        )}
      </FormControl>
      <Box mt={8}>
        <FancyButton isLoading={isRegistering} type="submit">
          Register
        </FancyButton>
      </Box>
    </form>
  );
}

type Props = {
  setErrors: (errors: string[]) => void;
};
