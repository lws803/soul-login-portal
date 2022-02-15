import axios from 'axios';

import { BASE_URL } from '../../constants';
import { ApiError } from '../../shared/api-types';

export const sendPasswordReset = async ({ email }: { email: string }) => {
  try {
    await axios.post(
      `${BASE_URL}/v1/users/request-password-reset-token?email=${email}`,
    );
    return { error: null };
  } catch ({ response: { data } }) {
    return { error: data as ApiError };
  }
};
