import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Register from './Register';

describe(Register, () => {
  const path =
    '/?platformId=1&callback=https://www.example.com&state=state&codeChallenge=CODE_CHALLENGE';

  it('renders', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <Register />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders without path', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Register />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
