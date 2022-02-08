import { useState } from 'react';

import Page from '../components/page';
import useQuery from '../hooks/useQuery';
import ResetPasswordForm from './reset-password/reset-password-form';

export default function ResetPassword() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Page errors={errors}>
      <ResetPasswordForm setErrors={setErrors} token={query.get('token')} />
    </Page>
  );
}
