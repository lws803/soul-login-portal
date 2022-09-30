import React from 'react';
import { render } from '@testing-library/react';

import ScopeRow from './ScoprRow';

describe(ScopeRow, () => {
  it('renders', () => {
    const { container } = render(<ScopeRow title="TITLE" />);
    expect(container).toMatchSnapshot();
  });
});
