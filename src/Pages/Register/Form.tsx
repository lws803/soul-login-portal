import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Box,
  Progress,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';
import { Formik, Form as FormikForm, Field, FieldProps } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';

import FancyButton from 'src/components/FancyButton';

import { register } from './api';

export default function Form({
  setErrors,
  insufficientParams,
  setIsSuccess,
}: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      onSubmit={async (values, action) => {
        setErrors([]);

        const { data, error } = await register({ values });
        if (error) {
          if (error.status === 400 && error.data.error === 'VALIDATION_ERROR') {
            action.setErrors({
              password: 'Password is too weak!',
            });
          } else if (error.status === 409) {
            if (error.data.error === 'DUPLICATE_USER_EMAIL_EXISTS') {
              action.setErrors({ email: error.data.message });
            }
            if (error.data.error === 'DUPLICATE_USERNAME_EXISTS') {
              action.setErrors({ username: error.data.message });
            }
          } else {
            setErrors([error.data.message]);
          }
        }
        if (data?.id) {
          setIsSuccess(true);
          if (!insufficientParams) navigate(`/${search}`);
        }
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required(),
        username: Yup.string()
          .required()
          .matches(/[a-z0-9-]/, {
            message:
              'Username can only contain lowercase alphanumeric characters with the exception of hyphens.',
          }),
        password: Yup.string().required(),
      })}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <Field name="username">
            {({ field, form }: FieldProps<string>) => (
              <FormControl
                isInvalid={!!form.errors.username && !!form.touched.username}
              >
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  {...field}
                  aria-label="Username input"
                  variant="filled"
                  placeholder="Your username"
                  disabled={isSubmitting}
                />
                <FormHelperText>
                  Choose a unique and awesome username!
                </FormHelperText>
                {form.errors.username && (
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                )}
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form }: FieldProps<string>) => (
              <FormControl
                isInvalid={!!form.errors.email && !!form.touched.email}
                marginTop={8}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  {...field}
                  aria-label="Email input"
                  variant="filled"
                  placeholder="Your email"
                  disabled={isSubmitting}
                />
                {!form.errors.email && (
                  <FormHelperText>
                    We&apos;ll never share your email.
                  </FormHelperText>
                )}
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
                {field.value.length > 0 && (
                  <Progress
                    value={((zxcvbn(field.value).score + 1) / 5) * 100}
                    colorScheme="soul.green"
                    size="xs"
                    mb={1}
                  />
                )}
                <Input
                  {...field}
                  type="password"
                  aria-label="Password input"
                  variant="filled"
                  placeholder="Your password"
                  disabled={isSubmitting}
                />
                {form.errors.password && (
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                )}
              </FormControl>
            )}
          </Field>
          <Box mt={8}>
            <FancyButton
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Register
            </FancyButton>
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
}

type Props = {
  setErrors: (errors: string[]) => void;
  insufficientParams: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
};
