import axios from 'axios';
import axiosRetry from 'axios-retry';

import { BASE_URL } from 'src/constants';
import { ApiError } from 'src/shared/apiTypes';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay, retries: 3 });

export const loginWithPlatform = async ({
  platformId,
  callback,
  values,
  state,
}: {
  platformId: number;
  callback: string;
  values: {
    email: string;
    password: string;
  };
  state: string;
}): Promise<{
  data: LoginWithPlatformResponse | null;
  error: ApiError | null;
}> => {
  try {
    const { data } = await axios.post<LoginWithPlatformResponse>(
      `${BASE_URL}/v1/auth/code?platformId=${platformId}&callback=${callback}&state=${state}`,
      values,
    );
    return { data, error: null };
  } catch ({ response: { data } }) {
    return { data: null, error: data as ApiError };
  }
};

type LoginWithPlatformResponse = {
  code: string;
  state: string;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${BASE_URL}/v1/auth/login`,
      { email, password },
    );
    return { data, error: null };
  } catch ({ response: { data } }) {
    return { data: null, error: data as ApiError };
  }
};

type LoginResponse = {
  accessToken: string;
};

export const joinPlatformAndLogin = async ({
  platformId,
  callback,
  email,
  password,
  accessToken,
  state,
}: {
  platformId: number;
  callback: string;
  email: string;
  password: string;
  accessToken: string;
  state: string;
}) => {
  try {
    await axios.post(`${BASE_URL}/v1/platforms/${platformId}/join`, undefined, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { data: codeData } = await axios.post<LoginWithPlatformResponse>(
      `${BASE_URL}/v1/auth/code?platformId=${platformId}&callback=${callback}&state=${state}`,
      { email, password },
    );
    return { data: codeData, error: null };
  } catch ({ response: { data } }) {
    return { data: null, error: data as ApiError };
  }
};
