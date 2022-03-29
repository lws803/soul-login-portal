import axios from 'axios';

import { BASE_URL } from '../../constants';
import { ApiError } from '../../shared/apiTypes';

export const register = async ({
  values,
}: {
  values: { email: string; password: string; username: string };
}) => {
  try {
    const { data } = await axios.post<Response>(`${BASE_URL}/v1/users`, values);
    return { data, error: null };
  } catch ({ response: { data, status } }) {
    return {
      data: null,
      error: { data: data as ApiError, status: status as number },
    };
  }
};

type Response = {
  id?: number;
};
