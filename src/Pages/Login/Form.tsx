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
import { Formik, Form as FormikForm, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import FancyButton from 'src/components/FancyButton';
import { SOUL_DEFAULT_PLATFORM_ID } from 'src/constants';

import JoinPlatform from './JoinPlatform';
import { joinPlatformAndLogin, login, loginWithPlatform } from './api';
import { redirectToCallback } from './utils';

export default function Form({
  setErrors,
  platformId,
  callback,
  disabled,
  state,
  codeChallenge,
  setJoinPlatform,
  joinPlatform,
}: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const loginAndJoinDefaultPlatform = async (args: LoginCredentials) => {
    const { data: preLoginData } = await login({
      email: args.email,
      password: args.password,
    });
    if (!preLoginData?.access_token) return null;
    const { data } = await joinPlatformAndLogin({
      platformId,
      callback,
      state,
      codeChallenge,
      email: args.email,
      password: args.password,
      accessToken: preLoginData.access_token,
    });
    return data;
  };

  const handleSubmit = async (values: LoginCredentials) => {
    setErrors([]);
    const { data, error } = await loginWithPlatform({
      values,
      platformId,
      callback,
      state,
      codeChallenge,
    });
    if (data)
      redirectToCallback({ code: data.code, state: data.state, callback });
    if (error) {
      if (error.error === 'USER_NOT_FOUND') {
        navigate(`/register${search}`);
        return;
      }
      if (
        error.error === 'PLATFORM_USER_NOT_FOUND' &&
        platformId === SOUL_DEFAULT_PLATFORM_ID
      ) {
        const loginResponse = await loginAndJoinDefaultPlatform({
          email: values.email,
          password: values.password,
        });
        if (loginResponse) {
          redirectToCallback({
            code: loginResponse.code,
            state: loginResponse.state,
            callback,
          });
          return;
        }
      }
      if (error.error === 'PLATFORM_USER_NOT_FOUND') {
        setJoinPlatform(true);
        return;
      }
      if (error.error === 'VALIDATION_ERROR') {
        setErrors(['Required params are not present.']);
        return;
      }
      setErrors([error.message]);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}
      validateOnChange={false}
    >
      {({ values, isSubmitting }) =>
        joinPlatform ? (
          <JoinPlatform
            email={values.email}
            password={values.password}
            platformId={platformId}
            callback={callback}
            setErrors={setErrors}
            state={state}
            codeChallenge={codeChallenge}
          />
        ) : (
          <FormikForm>
            <Field name="email">
              {({ field, form }: FieldProps<string>) => (
                <FormControl
                  isInvalid={!!form.errors.email && !!form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    disabled={disabled || isSubmitting}
                    aria-label="Email input"
                    variant="filled"
                    placeholder="Your email"
                  />
                  {form.errors.email && (
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps<string>) => (
                <FormControl
                  isInvalid={!!form.errors.password && !!form.touched.password}
                  marginTop={8}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    disabled={disabled || isSubmitting}
                    aria-label="Password input"
                    variant="filled"
                    placeholder="Your password"
                  />
                  <FormHelperText>
                    <Link href="/request-password-reset" target="_blank">
                      Forgot password?
                    </Link>
                  </FormHelperText>
                  {form.errors.password && (
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </Field>
            <Box mt={8}>
              <FancyButton
                isLoading={isSubmitting}
                disabled={disabled || isSubmitting}
                type="submit"
              >
                Login
              </FancyButton>
            </Box>
            <Box mt={6}>
              <Link href="/request-email-verification" target="_blank">
                Resend email verification
              </Link>
            </Box>
          </FormikForm>
        )
      }
    </Formik>
  );
}

type Props = {
  setErrors: (error: string[]) => void;
  platformId: number;
  callback: string;
  disabled: boolean;
  state: string;
  codeChallenge: string;
  setJoinPlatform: (joinPlatform: boolean) => void;
  joinPlatform: boolean;
};

type LoginCredentials = { email: string; password: string };
