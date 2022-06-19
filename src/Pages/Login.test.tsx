import React from 'react';
import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';
import * as api from './Login/api';
import * as utils from './Login/utils';

describe(Login, () => {
  const path =
    '/?client_id=1&redirect_uri=https://www.example.com&state=STATE&code_challenge=CODE_CHALLENGE';

  it('renders', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <Login />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders warning when callback, platform id or state is not provided', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    expect(
      await findByText(
        'Insufficient parameters provided in the url, a redirect_uri, client_id, ' +
          'state and code_challenge must be specified.',
      ),
    ).toBeInTheDocument();
  });

  it('logs in successfully', async () => {
    const loginWithPlatform = jest
      .spyOn(api, 'loginWithPlatform')
      .mockResolvedValue({
        data: { code: 'CODE', state: 'STATE' },
        error: null,
      });

    jest.spyOn(utils, 'redirectToCallback').mockImplementation();

    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={[path]}>
        <Login />
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

      expect(utils.redirectToCallback).toHaveBeenCalledWith({
        callback: 'https://www.example.com',
        code: 'CODE',
        state: 'STATE',
      });
    });
  });
});
