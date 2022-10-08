import React, { useState } from 'react';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { verifyEmailConfirmationToken } from 'src/modules/emailConfirmation';

import Page from '../components/Page';
import useQueryParams from '../hooks/useQueryParams';

export default function EmailConfirmation() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const query = useQueryParams();
  const token = query.get('token');

  useQuery(
    [verifyEmailConfirmationToken.key, token],
    () => verifyEmailConfirmationToken(token!),
    {
      onSettled: () => setLoading(false),
      onError: (error: any) => setErrors([error.response.data.message]),
      enabled: !!token,
    },
  );

  return (
    <Page errors={errors}>
      <Center mt={10}>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Text fontSize="3xl" textAlign="center">
            Email confirmed!
          </Text>
        )}
      </Center>
    </Page>
  );
}
