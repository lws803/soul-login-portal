import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { AxiosResponse } from 'axios';

import * as api from 'src/modules/passwordReset';

import Form from './Form';

// TODO: Fix this test
describe(Form, () => {
  const props: React.ComponentProps<typeof Form> = {
    setErrors: jest.fn(),
    setIsSuccess: jest.fn(),
  };

  it('renders', async () => {
    const { container } = render(<Form {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('requests for email verification', async () => {
    const setIsSuccess = jest.fn();
    const sendEmailConfirmation = jest
      .spyOn(api, 'requestPasswordReset')
      .mockResolvedValue({ data: null, status: 200 } as AxiosResponse<
        any,
        any
      >);

    const { getByLabelText, getByText } = render(
      <Form {...props} setIsSuccess={setIsSuccess} />,
    );

    act(() => {
      fireEvent.change(getByLabelText('Email input'), {
        target: { value: 'TEST@EMAIL.COM' },
      });
    });

    fireEvent.click(getByText('Request password reset'));

    await waitFor(() => {
      expect(sendEmailConfirmation).toHaveBeenCalledWith({
        email: 'TEST@EMAIL.COM',
      });
      expect(setIsSuccess).toHaveBeenCalledWith(true);
    });
  });
});
