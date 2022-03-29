import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Form from './Form';
import * as api from './api';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({ search: '?SEARCH' }),
}));

describe(Form, () => {
  const props: React.ComponentProps<typeof Form> = { setErrors: jest.fn() };

  it('renders', async () => {
    const { container } = render(
      <MemoryRouter>
        <Form {...props} />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('registers successfully', async () => {
    const register = jest
      .spyOn(api, 'register')
      .mockResolvedValue({ data: { id: 1 }, error: null });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Form {...props} />
      </MemoryRouter>,
    );

    act(() => {
      fireEvent.change(getByLabelText('Email input'), {
        target: { value: 'TEST@EMAIL.COM' },
      });
      fireEvent.change(getByLabelText('Username input'), {
        target: { value: 'USERNAME' },
      });
      fireEvent.change(getByLabelText('Password input'), {
        target: { value: 'PASSWORD' },
      });
    });
    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        values: {
          email: 'TEST@EMAIL.COM',
          password: 'PASSWORD',
          username: 'USERNAME',
        },
      });
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/?SEARCH');
    });
  });
});
