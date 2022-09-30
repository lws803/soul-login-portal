import React from 'react';
import { render } from '@testing-library/react';

import Scopes from './Scopes';

describe(Scopes, () => {
  it('renders', () => {
    const { container } = render(<Scopes />);
    expect(container).toMatchSnapshot();
  });
});
