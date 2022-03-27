import { useState, useEffect } from 'react';

import Form from './login/form';

import Page from '../components/page';
import Status from '../components/status';
import useQuery from '../hooks/useQuery';
import Title from '../components/title';

export default function Login() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!query.get('callback') || !query.get('platformId')) {
      setErrors(['PlatformId and callback is not present.']);
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
            disabled={!query.get('callback') || !query.get('platformId')}
            setIsSuccess={setIsSuccess}
          />
        </>
      )}
    </Page>
  );
}
