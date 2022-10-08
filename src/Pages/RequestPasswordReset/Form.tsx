import { Formik, Form as FormikForm, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset } from 'src/modules/passwordReset';
import { ApiError } from 'src/shared/apiTypes';

export default function Form({ setErrors, setIsSuccess }: Props) {
  const { mutate: dispatchPasswordRequest } = useMutation<
    unknown,
    ApiError,
    string
  >((email) => requestPasswordReset(email), {
    onMutate: () => setErrors([]),
    onError: (error) => setErrors([error.message]),
    onSuccess: () => setIsSuccess(true),
  });

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => dispatchPasswordRequest(values.email)}
      validationSchema={Yup.object({
        email: Yup.string().email().required(),
      })}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <FormikForm>
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
                  placeholder="Enter your email"
                />
                {form.errors.email && (
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                )}
              </FormControl>
            )}
          </Field>
          <HStack mt={8}>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Sending password reset email"
              width="100%"
              bg="soul.pink.light"
              _hover={{ bg: 'soul.pink.dark' }}
              _active={{ bg: 'soul.pink.dark' }}
            >
              Request password reset
            </Button>
          </HStack>
        </FormikForm>
      )}
    </Formik>
  );
}

type Props = {
  setErrors: (errors: string[]) => void;
  setIsSuccess(isSuccess: boolean): void;
};
