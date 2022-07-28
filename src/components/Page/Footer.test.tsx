import { render } from '@testing-library/react';

import Footer from './Footer';

describe(Footer, () => {
  it('renders', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
