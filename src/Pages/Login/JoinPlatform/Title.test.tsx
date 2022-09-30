import { render } from '@testing-library/react';

import Title from './Title';

describe(Title, () => {
  it('renders', () => {
    const { container } = render(
      <Title
        platform={{
          name: 'PLATFORM',
          nameHandle: 'PLATOFMR_HANDLE',
          isVerified: true,
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
