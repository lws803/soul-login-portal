import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

import JoinPlatform from './join-platform';
import * as api from './api';

describe(JoinPlatform, () => {
  const props: React.ComponentProps<typeof JoinPlatform> = {
    setErrors: jest.fn(),
    setIsSuccess: jest.fn(),
    email: 'TEST@GMAIL.COM',
    password: 'PASSWORD',
    platformId: 1,
    callback: 'https://www.example.com',
  };

  beforeEach(() => {
    jest
      .spyOn(api, 'login')
      .mockResolvedValue({ data: { accessToken: 'TOKEN' }, error: null });
  });

  it('renders', async () => {
    const { container, findByText } = render(<JoinPlatform {...props} />);

    await findByText('Join Platform!');
    expect(container).toMatchSnapshot();
  });

  it('joins platform when clicked', async () => {
    const joinPlatformAndLogin = jest
      .spyOn(api, 'joinPlatformAndLogin')
      .mockResolvedValue({ data: { code: 'CODE' }, error: null });
    const setIsSuccess = jest.fn();
    window.open = jest.fn();

    const { findByText } = render(
      <JoinPlatform {...props} setIsSuccess={setIsSuccess} />,
    );
    await act(async () => {});

    fireEvent.click(await findByText('Join Platform!'));

    await waitFor(() => {
      expect(joinPlatformAndLogin).toHaveBeenCalledWith({
        accessToken: 'TOKEN',
        callback: 'https://www.example.com',
        email: 'TEST@GMAIL.COM',
        password: 'PASSWORD',
        platformId: 1,
      });

      expect(window.open).toHaveBeenCalled();
    });
  });
});
