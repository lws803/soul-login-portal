import axios from 'axios';

import { BASE_URL } from 'src/constants';

export async function requestPasswordReset(email: string) {
  return axios.post(
    `${BASE_URL}/v1/users/request-password-reset-token`,
    {},
    { params: { email } },
  );
}
