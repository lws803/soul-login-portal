import axios from 'axios';
import axiosRetry from 'axios-retry';

import { BASE_URL } from 'src/constants';
import { ApiError } from 'src/shared/apiTypes';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay, retries: 3 });

export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  try {
    await axios.post(`${BASE_URL}/v1/users/password-reset?token=${token}`, {
      password: newPassword,
    });
    return { error: null };
  } catch ({ response: { data } }) {
    return { error: data as ApiError };
  }
};
