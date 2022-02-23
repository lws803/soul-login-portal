import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';

import Form from './form';
import * as api from './api';

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
      .spyOn(api, 'sendEmailConfirmation')
      .mockResolvedValue({ error: null });

    const { getByLabelText, getByText } = render(
      <Form {...props} setIsSuccess={setIsSuccess} />,
    );

    act(() => {
      fireEvent.change(getByLabelText('Email input'), {
        target: { value: 'TEST@EMAIL.COM' },
      });
    });

    fireEvent.click(getByText('Request email verification'));

    await waitFor(() => {
      expect(sendEmailConfirmation).toHaveBeenCalledWith({
        email: 'TEST@EMAIL.COM',
      });
      expect(setIsSuccess).toHaveBeenCalledWith(true);
    });
  });
});
