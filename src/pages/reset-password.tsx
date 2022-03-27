import { useState } from 'react';

import Form from './reset-password/form';

import Status from '../components/status';
import Page from '../components/page';
import useQuery from '../hooks/useQuery';
import Title from '../components/title';

export default function ResetPassword() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Page errors={errors}>
      {isSuccess ? (
        <Status
          status="Password reset!"
          message="Success! Please close this page and sign in again."
        />
      ) : (
        <>
          <Title title="Reset new password" />
          <Form
            setErrors={setErrors}
            setIsSuccess={setIsSuccess}
            token={query.get('token')}
          />
        </>
      )}
    </Page>
  );
}
