import axios from 'axios';

import { BASE_URL } from 'src/constants';

export async function verifyEmailConfirmationToken(token: string) {
  return axios.post(
    `${BASE_URL}/v1/users/verify-confirmation-token?token=${token}`,
  );
}

verifyEmailConfirmationToken.key =
  'modules/verifyEmailConfirmationToken/verify';
