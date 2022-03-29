import axios from 'axios';

import { BASE_URL } from '../../constants';
import { ApiError } from '../../shared/apiTypes';

export const sendEmailConfirmation = async ({ email }: { email: string }) => {
  try {
    await axios.post(
      `${BASE_URL}/v1/users/resend-confirmation-token?email=${email}`,
    );
    return { error: null };
  } catch ({ response: { data } }) {
    return { error: data as ApiError };
  }
};
