import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Login from './login';

describe(Login, () => {
  it('renders', async () => {
    const { container } = render(
      <MemoryRouter
        initialEntries={['/?platformId=1&callback=https://www.example.com']}
      >
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
});
