import React from 'react';
import { fireEvent, render, act, waitFor } from '@testing-library/react';
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
  const props: React.ComponentProps<typeof Form> = {
    setErrors: jest.fn(),
    platformId: 1,
    callback: 'https://www.example.com',
    disabled: false,
    state: 'STATE',
    codeChallenge: 'CODE_CHALLENGE',
    setJoinPlatform: jest.fn(),
    joinPlatform: false,
  };

  it('renders', async () => {
    const { container } = render(
      <MemoryRouter>
        <Form {...props} />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('logs in successfully', async () => {
    window.open = jest.fn();

    const loginWithPlatform = jest
      .spyOn(api, 'loginWithPlatform')
      .mockResolvedValue({
        data: { code: 'CODE', state: 'STATE' },
        error: null,
      });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Form {...props} />
      </MemoryRouter>,
    );

    act(() => {
      fireEvent.change(getByLabelText('Email input'), {
        target: { value: 'TEST@EMAIL.COM' },
      });
      fireEvent.change(getByLabelText('Password input'), {
        target: { value: 'PASSWORD' },
      });
    });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(loginWithPlatform).toHaveBeenCalledWith({
        callback: 'https://www.example.com',
        platformId: 1,
        values: {
          email: 'TEST@EMAIL.COM',
          password: 'PASSWORD',
        },
        state: 'STATE',
        codeChallenge: 'CODE_CHALLENGE',
      });
      expect(window.open).toHaveBeenCalled();
    });
  });

  it('redirects to register page', async () => {
    jest.spyOn(api, 'loginWithPlatform').mockResolvedValue({
      data: null,
      error: { error: 'USER_NOT_FOUND', message: '' },
    });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Form {...props} />
      </MemoryRouter>,
    );

    act(() => {
      fireEvent.change(getByLabelText('Email input'), {
        target: { value: 'TEST@EMAIL.COM' },
      });
      fireEvent.change(getByLabelText('Password input'), {
        target: { value: 'PASSWORD' },
      });
    });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/register?SEARCH');
    });
  });

  it('shows join platform button', async () => {
    const setJoinPlatform = jest.fn();

    jest.spyOn(api, 'loginWithPlatform').mockResolvedValue({
      data: null,
      error: { error: 'PLATFORM_USER_NOT_FOUND', message: '' },
    });
    jest.spyOn(api, 'login').mockResolvedValue({
      data: { access_token: 'ACCESS_TOKEN' },
      error: null,
    });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Form {...props} setJoinPlatform={setJoinPlatform} />
      </MemoryRouter>,
    );

    act(() => {
      fireEvent.change(getByLabelText('Email input'), {
        target: { value: 'TEST@EMAIL.COM' },
      });
      fireEvent.change(getByLabelText('Password input'), {
        target: { value: 'PASSWORD' },
      });
    });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(setJoinPlatform).toHaveBeenCalledWith(true);
    });
  });
});
