import { useState } from 'react';

import Form from './reset-password/form';

import Status from '../components/status';
import Page from '../components/page';
import useQuery from '../hooks/useQuery';

export default function ResetPassword() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Page errors={errors}>
      {isSuccess ? (
        <Status status="Password reset successfully! Please close this page" />
      ) : (
        <Form
          setErrors={setErrors}
          setIsSuccess={setIsSuccess}
          token={query.get('token')}
        />
      )}
    </Page>
  );
}
