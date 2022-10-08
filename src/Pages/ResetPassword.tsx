import { useState } from 'react';

import Form from './ResetPassword/Form';

import Status from '../components/Status';
import Page from '../components/Page';
import useQueryParams from '../hooks/useQueryParams';
import Title from '../components/Title';

export default function ResetPassword() {
  const query = useQueryParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Page errors={errors} title={<Title title="Reset new password" />}>
      {isSuccess ? (
        <Status
          status="Password reset!"
          message="Success! Please close this page and sign in again."
        />
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
