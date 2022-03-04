import React, { useState } from 'react';

import Form from './request-password-reset/form';

import Status from '../components/status';
import Page from '../components/page';

export default function RequestPasswordReset() {
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Page errors={errors}>
      {isSuccess ? (
        <Status
          status="Request submitted!"
          message="Password reset requested, please check your email."
        />
      ) : (
        <Form setErrors={setErrors} setIsSuccess={setIsSuccess} />
      )}
    </Page>
  );
}
