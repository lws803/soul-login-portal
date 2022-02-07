import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LoginForm from './login/login-form';

import Page from '../components/page';

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
      <LoginForm
        setErrors={setErrors}
        callback={query.get('callback')!}
        platformId={parseInt(query.get('platformId')!, 10)}
        disabled={!query.get('callback') || !query.get('platformId')}
      />
    </Page>
  );
}

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
