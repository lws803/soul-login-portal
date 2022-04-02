import { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';

import FancyButton from 'src/components/FancyButton';

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
        setIsSuccess(true);
        window.open(`${callback}?code=${data.code}`, '_self');
      }
    }
    setIsJoining(false);
  };

  return (
    <Center width="100%">
      <FancyButton
        onClick={joinPlatform}
        isLoading={!accessToken || isJoining}
        aria-label="Join platform button"
      >
        Join Platform!
      </FancyButton>
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
