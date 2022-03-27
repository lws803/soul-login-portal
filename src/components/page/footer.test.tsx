import { render } from '@testing-library/react';

import Footer from './footer';

describe(Footer, () => {
  it('renders', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Github')).toBeInTheDocument();
  });
});
