import axios from 'axios';

import { BASE_URL } from '../../constants';

export const login = async (
  {
    platformId,
    callback,
    values,
  }: {
    platformId: number;
    callback: string;
    values: {
      email: string;
      password: string;
    };
  },
  callbackFn: () => void,
) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/v1/auth/code?platformId=${platformId}&callback=${callback}`,
      values,
    );

    if (data.code) {
      callbackFn();
    }
  } catch ({ response: { data } }) {
    return [null, data];
  }
};
