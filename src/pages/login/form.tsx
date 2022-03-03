import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Link,
  VStack,
  Box,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import JoinPlatform from './join-platform';
import { loginWithPlatform } from './api';
import LoginButton from './form/login-button';

export default function Form({
  setErrors,
  setIsSuccess,
  platformId,
  callback,
  disabled,
}: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [joinPlatform, setJoinPlatform] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setErrors([]);
      setIsLoggingIn(true);
      const { data, error } = await loginWithPlatform({
        values,
        platformId,
        callback,
      });
      if (error) {
        if (error.error === 'USER_NOT_FOUND') {
          navigate(`/register${search}`);
        } else if (error.error === 'PLATFORM_USER_NOT_FOUND') {
          setJoinPlatform(true);
        } else if (error.error === 'VALIDATION_ERROR') {
          setErrors(['PlatformId and callback is not present.']);
        } else {
          setErrors([error.message]);
        }
      }
      if (data?.code) {
        if (typeof window !== 'undefined') {
          setIsSuccess(true);
          window.open(`${callback}?code=${data.code}`, '_self');
        }
      }
      setIsLoggingIn(false);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  });

  // TODO: Add option to resend email verification if email is not verified

  if (joinPlatform) {
    return (
      <JoinPlatform
        email={formik.values.email}
        password={formik.values.password}
        platformId={platformId}
        callback={callback}
        setErrors={setErrors}
        setIsSuccess={setIsSuccess}
      />
    );
  }

  return (
    <>
      <form onSubmit={(e) => formik.handleSubmit(e as any)}>
        <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled={disabled}
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
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={disabled}
            aria-label="Password input"
          />
          {formik.errors.password && (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          )}
        </FormControl>
        <Box mt={4}>
          <Link href="/request-password-reset">Forgot password?</Link>
        </Box>
        <Box mt={8}>
          <LoginButton isLoggingIn={isLoggingIn} disabled={disabled} />
        </Box>
      </form>
      <VStack mt={6} alignItems="left">
        <p>
          Not a member yet?{' '}
          <Link href={`/register/${search}`}>
            <strong>Register Now</strong>
          </Link>
        </p>
        <Link href="/request-email-verification">
          Resend email verification
        </Link>
      </VStack>
    </>
  );
}

type Props = {
  setErrors: (error: string[]) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  platformId: number;
  callback: string;
  disabled: boolean;
};
