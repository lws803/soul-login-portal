import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RequestEmailVerification from './request-email-verification';

describe(RequestEmailVerification, () => {
  it('renders', async () => {
    const { container } = render(
      <MemoryRouter>
        <RequestEmailVerification />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
