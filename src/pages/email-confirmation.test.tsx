import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

import EmailConfirmation from './email-confirmation';

describe(EmailConfirmation, () => {
  const path = '/?token=CODE';

  it('renders', async () => {
    const emailConfirmationCall = jest
      .spyOn(axios, 'post')
      .mockResolvedValue({});

    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <EmailConfirmation />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(emailConfirmationCall).toHaveBeenCalledWith(
      'https://api.soul-network.com/v1/users/verify-confirmation-token?token=CODE',
    );
  });
});
