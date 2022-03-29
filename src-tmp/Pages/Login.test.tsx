import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';
import * as api from './Login/api';

describe(Login, () => {
  const path = '/?platformId=1&callback=https://www.example.com';

  it('renders', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <Login />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders warning when callback or platform id is not provided', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    expect(
      await findByText('PlatformId and callback is not present.'),
    ).toBeInTheDocument();
  });

  it('logs in successfully', async () => {
    window.open = jest.fn();
    const loginWithPlatform = jest
      .spyOn(api, 'loginWithPlatform')
      .mockResolvedValue({ data: { code: 'CODE' }, error: null });

    const { getByLabelText, getByText, findByText } = render(
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

    expect(await findByText('Login successful')).toBeInTheDocument();

    expect(loginWithPlatform).toHaveBeenCalledWith({
      callback: 'https://www.example.com',
      platformId: 1,
      values: {
        email: 'TEST@EMAIL.COM',
        password: 'PASSWORD',
      },
    });
    expect(window.open).toHaveBeenCalled();
  });
});
