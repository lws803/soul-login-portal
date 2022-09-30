import { useEffect, useState } from 'react';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

import FancyButton from 'src/components/FancyButton';

import {
  login,
  joinPlatformAndLogin,
  getPlatformDetails,
  Platform,
} from './api';
import { redirectToCallback } from './utils';
import Title from './JoinPlatform/Title';
import Scopes from './JoinPlatform/Scopes';

export default function JoinPlatform({
  email,
  password,
  platformId,
  callback,
  setErrors,
  state,
  codeChallenge,
  ...props
}: Props) {
  const [accessToken, setAccessToken] = useState<string>();
  const [platform, setPlatform] = useState<Platform>();
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

  useEffect(() => {
    const getPlatform = async () => {
      const { data, error } = await getPlatformDetails({ platformId });
      if (error) {
        setErrors([error.message]);
      }
      if (data) {
        setPlatform(data);
      }
    };
    getPlatform();
  }, [platformId]);

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

  if (!platform) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack spacing="32px" {...props}>
      <VStack justifyContent="center">
        <Title platform={platform} />
        <Text
          color="soul.mutedGrey"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          w={['90vw', '90vw', '500px', '500px']}
          textAlign="center"
        >
          {platform.nameHandle}
        </Text>
      </VStack>
      <Scopes />
      <FancyButton
        onClick={joinPlatform}
        isLoading={!accessToken || isJoining}
        aria-label="Join platform button"
      >
        Join Platform!
      </FancyButton>
    </VStack>
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
} & React.ComponentProps<typeof VStack>;
