import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import FancyButton from './fancy-button';

describe(FancyButton, () => {
  const props: React.ComponentProps<typeof FancyButton> = {
    onClick: jest.fn(),
    disabled: false,
    isLoading: false,
  };

  it('renders', () => {
    const { container } = render(<FancyButton {...props}>Button</FancyButton>);
    expect(container).toMatchSnapshot();
  });

  it('clicks and calls onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <FancyButton {...props} onClick={onClick}>
        Button
      </FancyButton>,
    );

    fireEvent.click(getByText('Button'));

    expect(onClick).toHaveBeenCalled();
  });

  it('to be disabled', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <FancyButton {...props} onClick={onClick} disabled>
        Button
      </FancyButton>,
    );

    fireEvent.click(getByText('Button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading state', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <FancyButton {...props} onClick={onClick} isLoading>
        Button
      </FancyButton>,
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
