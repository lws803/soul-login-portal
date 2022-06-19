import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Link,
  Box,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import FancyButton from 'src/components/FancyButton';

import JoinPlatform from './JoinPlatform';
import { loginWithPlatform } from './api';
import { redirectToCallback } from './utils';

export default function Form({
  setErrors,
  platformId,
  callback,
  disabled,
  state,
  codeChallenge,
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
        state,
        codeChallenge,
      });
      if (error) {
        setIsLoggingIn(false);
        if (error.error === 'USER_NOT_FOUND') {
          navigate(`/register${search}`);
        } else if (error.error === 'PLATFORM_USER_NOT_FOUND') {
          setJoinPlatform(true);
        } else if (error.error === 'VALIDATION_ERROR') {
          setErrors(['client_id and redirect_uri is not present.']);
        } else {
          setErrors([error.message]);
        }
      }
      if (data) {
        redirectToCallback({ code: data.code, state: data.state, callback });
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  });

  if (joinPlatform) {
    return (
      <JoinPlatform
        email={formik.values.email}
        password={formik.values.password}
        platformId={platformId}
        callback={callback}
        setErrors={setErrors}
        state={state}
        codeChallenge={codeChallenge}
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
            disabled={disabled || isLoggingIn}
            aria-label="Email input"
            variant="filled"
            placeholder="Your email"
          />
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
            disabled={disabled || isLoggingIn}
            aria-label="Password input"
            variant="filled"
            placeholder="Your password"
          />
          <FormHelperText>
            <Link href="/request-password-reset" target="_blank">
              Forgot password?
            </Link>
          </FormHelperText>
          {formik.errors.password && (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          )}
        </FormControl>
        <Box mt={8}>
          <FancyButton
            isLoading={isLoggingIn}
            disabled={disabled || isLoggingIn}
            type="submit"
          >
            Login
          </FancyButton>
        </Box>
      </form>
      <Box mt={6}>
        <Link href="/request-email-verification" target="_blank">
          Resend email verification
        </Link>
      </Box>
    </>
  );
}

type Props = {
  setErrors: (error: string[]) => void;
  platformId: number;
  callback: string;
  disabled: boolean;
  state: string;
  codeChallenge: string;
};
