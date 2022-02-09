import { useState } from 'react';

import Page from '../components/page';
import useQuery from '../hooks/useQuery';
import Form from './reset-password/form';

export default function ResetPassword() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Page errors={errors}>
      <Form setErrors={setErrors} token={query.get('token')} />
    </Page>
  );
}
