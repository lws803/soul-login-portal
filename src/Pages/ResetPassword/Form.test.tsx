import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';

import Form from './Form';

describe(Form, () => {
  const props: React.ComponentProps<typeof Form> = {
    setErrors: jest.fn(),
    setIsSuccess: jest.fn(),
    token: 'TOKEN',
  };

  beforeEach(() => {
    jest
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: { error: null, status: 200 } });
  });

  it('renders', async () => {
    const { container } = render(<Form {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('resets password', async () => {
    const { getByLabelText, getByText } = render(<Form {...props} />);

    act(() => {
      fireEvent.change(getByLabelText('Password input'), {
        target: { value: 'NEW_PASSWORD' },
      });
    });

    fireEvent.click(getByText('Reset password'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://api.network.com/v1/users/password-reset?token=TOKEN',
        { password: 'NEW_PASSWORD' },
      );
    });
  });
});
