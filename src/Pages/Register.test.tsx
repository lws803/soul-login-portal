import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Register from './Register';

describe(Register, () => {
  const path =
    '/?client_id=1&redirect_uri=https://www.example.com&state=state&code_challenge=CODE_CHALLENGE';

  it('renders', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <Register />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders without params', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Register />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
