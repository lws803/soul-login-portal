export const redirectToCallback = ({
  callback,
  code,
  state,
}: {
  callback: string;
  code: string;
  state: string;
}) => {
  if (typeof window !== 'undefined') {
    window.open(`${callback}?code=${code}&state=${state}`, '_self');
  } else {
    throw new Error("Can't redirect to callback.");
  }
};
