import axios from 'axios';
import axiosRetry from 'axios-retry';

import { BASE_URL } from 'src/constants';
import { ApiError } from 'src/shared/apiTypes';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay, retries: 3 });

export const sendEmailConfirmation = async ({ email }: { email: string }) => {
  try {
    await axios.post(
      `${BASE_URL}/v1/users/resend-confirmation-token`,
      {},
      { params: { email } },
    );
    return { error: null };
  } catch ({ response: { data } }) {
    return { error: data as ApiError };
  }
};
