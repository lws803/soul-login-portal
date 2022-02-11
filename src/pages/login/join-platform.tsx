import { useEffect, useState } from 'react';
import { Button, Center } from '@chakra-ui/react';

import { login, joinPlatformAndLogin } from './api';

export default function JoinPlatform({
  email,
  password,
  platformId,
  callback,
  setErrors,
  setIsSuccess,
}: Props) {
  const [accessToken, setAccessToken] = useState<string>();
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const preLogin = async () => {
      const { data, error } = await login({ email, password });
      if (error) {
        setErrors([error.message]);
      }
      if (data) {
        setAccessToken(data.accessToken);
      }
    };
    preLogin();
  }, [email, password, setErrors]);

  const joinPlatform = async () => {
    setIsJoining(true);
    const { data, error } = await joinPlatformAndLogin({
      platformId,
      callback,
      email,
      password,
      accessToken: accessToken!,
    });
    if (error) {
      setErrors([error.message]);
    }
    if (data) {
      if (typeof window !== 'undefined') {
        window.open(`${callback}?code=${data.code}`, '_blank');
        setIsSuccess(true);
      }
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
  setIsSuccess: (isSuccess: boolean) => void;
};
