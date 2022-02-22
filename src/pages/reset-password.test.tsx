import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ResetPassword from './reset-password';

describe(ResetPassword, () => {
  const path = '/?token=CODE';

  it('renders', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <ResetPassword />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('disables button when code is not provided', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>,
    );
    expect(getByText('Reset password')).toBeDisabled();
  });
});
