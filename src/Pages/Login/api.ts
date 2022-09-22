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
  codeChallenge,
}: {
  platformId: number;
  callback: string;
  values: {
    email: string;
    password: string;
  };
  state: string;
  codeChallenge: string;
}): Promise<{
  data: LoginWithPlatformResponse | null;
  error: ApiError | null;
}> => {
  try {
    const { data } = await axios.post<LoginWithPlatformResponse>(
      `${BASE_URL}/v1/auth/code`,
      values,
      {
        params: {
          client_id: platformId,
          redirect_uri: callback,
          state,
          code_challenge: codeChallenge,
        },
      },
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
  access_token: string;
};

export const joinPlatformAndLogin = async ({
  platformId,
  callback,
  email,
  password,
  accessToken,
  state,
  codeChallenge,
}: {
  platformId: number;
  callback: string;
  email: string;
  password: string;
  accessToken: string;
  state: string;
  codeChallenge: string;
}) => {
  try {
    await axios.post(`${BASE_URL}/v1/platforms/${platformId}/join`, undefined, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { data: codeData } = await axios.post<LoginWithPlatformResponse>(
      `${BASE_URL}/v1/auth/code`,
      { email, password },
      {
        params: {
          client_id: platformId,
          redirect_uri: callback,
          state,
          code_challenge: codeChallenge,
        },
      },
    );
    return { data: codeData, error: null };
  } catch ({ response: { data } }) {
    return { data: null, error: data as ApiError };
  }
};

type PlatformData = {
  id: number;
  name: string;
  name_handle: string;
  is_verified: boolean;
};

export type Platform = {
  name: string;
  nameHandle: string;
  isVerified: boolean;
};

export const getPlatformDetails = async ({
  platformId,
}: {
  platformId: number;
}): Promise<
  { data: Platform; error: null } | { data: null; error: ApiError }
> => {
  try {
    const { data: platform } = await axios.get<PlatformData>(
      `${BASE_URL}/v1/platforms/${platformId}`,
    );

    return {
      data: {
        name: platform.name,
        nameHandle: platform.name_handle,
        isVerified: platform.is_verified,
      },
      error: null,
    };
  } catch ({ response: { data } }) {
    return { data: null, error: data as ApiError };
  }
};
