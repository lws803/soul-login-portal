import { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';

import FancyButton from 'src/components/FancyButton';

import { login, joinPlatformAndLogin } from './api';
import { redirectToCallback } from './utils';

export default function JoinPlatform({
  email,
  password,
  platformId,
  callback,
  setErrors,
  state,
  codeChallenge,
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
        setAccessToken(data.access_token);
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
      state,
      accessToken: accessToken!,
      codeChallenge,
    });
    if (error) {
      setErrors([error.message]);
    }
    if (data) {
      redirectToCallback({ code: data.code, state: data.state, callback });
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
  state: string;
  codeChallenge: string;
};
