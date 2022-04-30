import { useState, useEffect } from 'react';

import Form from './Login/Form';

import Page from '../components/Page';
import Status from '../components/Status';
import useQuery from '../hooks/useQuery';
import Title from '../components/Title';

export default function Login() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const insufficientParams =
    !query.get('platformId') || !query.get('callback') || !query.get('state');

  useEffect(() => {
    if (insufficientParams) {
      setErrors([
        'Insufficient parameters provided in the url, a callback, platformId and state must be specified.',
      ]);
    }
  }, [query]);

  return (
    <Page errors={errors}>
      {isSuccess ? (
        <Status status="Login successful" message="Redirecting you back..." />
      ) : (
        <>
          <Title title="Login to your account" />
          <Form
            setErrors={setErrors}
            callback={query.get('callback')!}
            platformId={parseInt(query.get('platformId')!, 10)}
            disabled={insufficientParams}
            setIsSuccess={setIsSuccess}
            state={query.get('state')!}
          />
        </>
      )}
    </Page>
  );
}
