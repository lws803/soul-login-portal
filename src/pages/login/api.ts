import axios from 'axios';

import { BASE_URL } from '../../constants';
import { ApiError } from '../../shared/api-types';

export const login = async ({
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
}): Promise<{ data: Response | null; error: ApiError | null }> => {
  try {
    const { data } = await axios.post<Response>(
      `${BASE_URL}/v1/auth/code?platformId=${platformId}&callback=${callback}`,
      values,
    );
    return { data, error: null };
  } catch ({ response: { data } }) {
    return { data: null, error: data as ApiError };
  }
};

type Response = {
  code: string;
};
