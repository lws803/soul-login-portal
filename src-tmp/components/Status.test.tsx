import { render } from '@testing-library/react';

import Status from './Status';

describe(Status, () => {
  it('renders', () => {
    const { container } = render(<Status status="STATUS" message="MESSAGE" />);
    expect(container).toMatchSnapshot();
  });
});
