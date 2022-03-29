import { render } from '@testing-library/react';

import Title from './Title';

describe(Title, () => {
  it('renders', () => {
    const { container } = render(<Title title="Title" subTitle="Sub title" />);
    expect(container).toMatchSnapshot();
  });
});
