import { redirectToCallback } from './utils';

describe(redirectToCallback, () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  it('redirects with the right parameters', () => {
    const callback = 'CALLBACK';
    const code = 'CODE';
    const state = 'STATE';

    redirectToCallback({ callback, code, state });

    expect(window.open).toHaveBeenCalledWith(
      `${callback}?code=${code}&state=${state}`,
      '_self',
    );
  });
});
