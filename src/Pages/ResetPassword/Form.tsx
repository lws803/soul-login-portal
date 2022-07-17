import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Button,
  Progress,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

import { resetPassword } from './api';

export default function Form({ token, setErrors, setIsSuccess }: Props) {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: async (values) => {
      setErrors([]);
      const { error } = await resetPassword({
        token: token!,
        newPassword: values.password,
      });

      if (!error) setIsSuccess(true);
      if (error) {
        if (error.error === 'VALIDATION_ERROR') {
          formik.setErrors({
            password: 'Password is too weak!',
          });
        } else {
          setErrors([error.message]);
        }
      }
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
        {formik.values.password.length > 0 && (
          <Progress
            value={((zxcvbn(formik.values.password).score + 1) / 5) * 100}
            colorScheme="soul.green"
            size="xs"
            mb={1}
          />
        )}
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          disabled={!token}
          aria-label="Password input"
          variant="filled"
          placeholder="Enter your new password"
        />
        {formik.errors.password && (
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        )}
      </FormControl>
      <HStack mt={8}>
        <Button
          type="submit"
          isLoading={formik.isSubmitting}
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
