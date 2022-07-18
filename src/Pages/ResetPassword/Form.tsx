import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Button,
  Progress,
} from '@chakra-ui/react';
import { Formik, Field, Form as FormikForm, FieldProps } from 'formik';
import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

import { resetPassword } from './api';

export default function Form({ token, setErrors, setIsSuccess }: Props) {
  return (
    <Formik
      initialValues={{ password: '' }}
      onSubmit={async (values, action) => {
        setErrors([]);
        const { error } = await resetPassword({
          token: token!,
          newPassword: values.password,
        });

        if (!error) setIsSuccess(true);
        if (error) {
          if (error.error === 'VALIDATION_ERROR') {
            action.setErrors({
              password: 'Password is too weak!',
            });
          } else {
            setErrors([error.message]);
          }
        }
      }}
      validationSchema={Yup.object({
        password: Yup.string().required(),
      })}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <Field name="password">
            {({ field, form }: FieldProps<string>) => (
              <FormControl
                isInvalid={!!form.errors.password && !!form.touched.password}
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
                  disabled={!token}
                  aria-label="Password input"
                  variant="filled"
                  placeholder="Enter your new password"
                />
                {form.errors.password && (
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                )}
              </FormControl>
            )}
          </Field>
          <HStack mt={8}>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!token}
              bg="soul.pink.light"
              _hover={{ bg: 'soul.pink.dark' }}
              _active={{ bg: 'soul.pink.dark' }}
              width="100%"
            >
              Reset password
            </Button>
          </HStack>
        </FormikForm>
      )}
    </Formik>
  );
}

type Props = {
  setErrors: (error: string[]) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  token?: string | null;
};
