import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Button,
} from '@chakra-ui/react';

import { sendPasswordReset } from './api';

export default function Form({ setErrors, setIsSuccess }: Props) {
  const [isSending, setIsSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      setErrors([]);
      setIsSending(true);
      const { error } = await sendPasswordReset(values);

      if (error) {
        setErrors([error.message]);
      } else {
        setIsSuccess(true);
      }
      setIsSending(false);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    validateOnChange: false,
  });

  return (
    <form onSubmit={(e) => formik.handleSubmit(e as any)}>
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
        {formik.errors.email && (
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        )}
      </FormControl>
      <HStack mt={8}>
        <Button
          type="submit"
          isLoading={isSending}
          loadingText="Sending password reset email"
          width="100%"
          bg="soul.pink.light"
          _hover={{ bg: 'soul.pink.dark' }}
          _active={{ bg: 'soul.pink.dark' }}
        >
          Request password reset
        </Button>
      </HStack>
    </form>
  );
}

type Props = {
  setErrors: (errors: string[]) => void;
  setIsSuccess(isSuccess: boolean): void;
};
