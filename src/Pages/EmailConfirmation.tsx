import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Spinner, Text } from '@chakra-ui/react';

import { BASE_URL } from '../constants';
import Page from '../components/Page';
import useQueryParams from '../hooks/useQueryParams';

export default function EmailConfirmation() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const query = useQueryParams();

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/v1/users/verify-confirmation-token?token=${query.get(
          'token',
        )}`,
      )
      .then(() => {
        setLoading(false);
      })
      .catch((error: any) => {
        setErrors([error.response.data.message]);
      });
  }, [query]);

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
