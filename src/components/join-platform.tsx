import { Button, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';

import { BASE_URL } from '../constants';

export default function JoinPlatform({
  email,
  password,
  platformId,
  callback,
  setErrors,
}: Props) {
  const [accessToken, setAccessToken] = useState<string>();
  useEffect(() => {
    axios
      .post(`${BASE_URL}/v1/auth/login`, { email, password })
      .then(({ data }) => {
        setAccessToken(data.accessToken);
      })
      .catch(({ response: { data, status } }) => {
        console.log(data, status);
      });
  }, []);

  const joinPlatform = () => {
    axios
      .post(`${BASE_URL}/v1/platforms/${platformId}/join`, undefined, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        axios
          .post(
            `${BASE_URL}/v1/auth/code?platformId=${platformId}&callback=${callback}`,
            { email, password },
          )
          .then(({ data }) => {
            if (data.code) {
              if (typeof window !== 'undefined') {
                window.open(`https://${callback}?code=${data.code}`, '_blank');
              }
            }
          })
          .catch(({ response: { data } }) => {
            setErrors([data.message]);
          });
      })
      .catch(({ data, status }) => {
        console.log(data, status);
      });
  };

  return (
    <Center width="100%">
      <Button
        colorScheme="teal"
        onClick={joinPlatform}
        isLoading={!accessToken}
      >
        Join Platform!
      </Button>
    </Center>
  );
}

type Props = {
  email: string;
  password: string;
  platformId: number;
  callback: string;
  setErrors: (error: string[]) => void;
};
