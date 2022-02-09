import { useState, useEffect } from 'react';

import Form from './login/form';

import Page from '../components/page';
import useQuery from '../hooks/useQuery';

export default function Login() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!query.get('callback') || !query.get('platformId')) {
      setErrors(['PlatformId and callback is not present.']);
    }
  }, [query]);

  return (
    <Page errors={errors}>
      <Form
        setErrors={setErrors}
        callback={query.get('callback')!}
        platformId={parseInt(query.get('platformId')!, 10)}
        disabled={!query.get('callback') || !query.get('platformId')}
      />
    </Page>
  );
}
