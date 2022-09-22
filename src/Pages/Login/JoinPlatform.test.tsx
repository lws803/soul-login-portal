import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import JoinPlatform from './JoinPlatform';
import * as api from './api';
import * as utils from './utils';

describe(JoinPlatform, () => {
  const props: React.ComponentProps<typeof JoinPlatform> = {
    setErrors: jest.fn(),
    email: 'TEST@GMAIL.COM',
    password: 'PASSWORD',
    platformId: 1,
    callback: 'https://www.example.com',
    state: 'STATE',
    codeChallenge: 'CODE_CHALLENGE',
  };

  beforeEach(() => {
    jest
      .spyOn(api, 'login')
      .mockResolvedValue({ data: { access_token: 'TOKEN' }, error: null });
    jest.spyOn(api, 'getPlatformDetails').mockResolvedValue({
      data: { nameHandle: 'TEST#1', name: 'TEST', isVerified: true },
      error: null,
    });
  });

  it('renders', async () => {
    const { container, findByText } = render(<JoinPlatform {...props} />);

    await findByText('Join Platform!');
    expect(container).toMatchSnapshot();
  });

  it('joins platform when clicked', async () => {
    const joinPlatformAndLogin = jest
      .spyOn(api, 'joinPlatformAndLogin')
      .mockResolvedValue({
        data: { code: 'CODE', state: 'STATE' },
        error: null,
      });

    jest.spyOn(utils, 'redirectToCallback').mockImplementation();

    const { findByText } = render(<JoinPlatform {...props} />);

    fireEvent.click(await findByText('Join Platform!'));

    await waitFor(() => {
      expect(joinPlatformAndLogin).toHaveBeenCalledWith({
        accessToken: 'TOKEN',
        callback: 'https://www.example.com',
        email: 'TEST@GMAIL.COM',
        password: 'PASSWORD',
        platformId: 1,
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
