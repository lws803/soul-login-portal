import { Button, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';

import { BASE_URL } from '../../constants';

export default function JoinPlatform({
  email,
  password,
  platformId,
  callback,
  setErrors,
}: Props) {
  const [accessToken, setAccessToken] = useState<string>();
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/v1/auth/login`, { email, password })
      .then(({ data }) => {
        setAccessToken(data.accessToken);
      })
      .catch(({ response: { data } }) => {
        setErrors([data.message]);
      });
  }, []);

  const joinPlatform = async () => {
    setIsJoining(true);
    try {
      await axios.post(
        `${BASE_URL}/v1/platforms/${platformId}/join`,
        undefined,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      const { data: codeData } = await axios.post(
        `${BASE_URL}/v1/auth/code?platformId=${platformId}&callback=${callback}`,
        { email, password },
      );
      if (typeof window !== 'undefined') {
        window.open(`${callback}?code=${codeData.code}`, '_blank');
        route('/logging-in');
      }
    } catch (error: any) {
      setErrors([error.response.data.message]);
    }
    setIsJoining(false);
  };

  return (
    <Center width="100%">
      <Button
        colorScheme="teal"
        onClick={joinPlatform}
        isLoading={!accessToken || isJoining}
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
