import { useState, useEffect } from 'react';

import Form from './Login/Form';

import Page from '../components/Page';
import useQuery from '../hooks/useQuery';
import Title from '../components/Title';

export default function Login() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);

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
      <>
        <Title title="Login to your account" />
        <Form
          setErrors={setErrors}
          callback={query.get('callback')!}
          platformId={parseInt(query.get('platformId')!, 10)}
          disabled={insufficientParams}
          state={query.get('state')!}
        />
      </>
    </Page>
  );
}
