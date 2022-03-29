import React, { useState } from 'react';

import Form from './RequestPasswordReset/Form';

import Status from '../components/Status';
import Page from '../components/Page';
import Title from '../components/Title';

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
        <>
          <Title title="Request new password" />
          <Form setErrors={setErrors} setIsSuccess={setIsSuccess} />
        </>
      )}
    </Page>
  );
}
