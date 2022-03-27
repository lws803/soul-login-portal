import React, { useState } from 'react';

import Form from './request-email-verification/form';

import Status from '../components/status';
import Page from '../components/page';
import Title from '../components/title';

export default function RequestEmailVerification() {
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Page errors={errors}>
      {isSuccess ? (
        <Status
          status="Request submitted!"
          message="Sent email verification, please check your email."
        />
      ) : (
        <>
          <Title title="Resend email verification" />
          <Form setErrors={setErrors} setIsSuccess={setIsSuccess} />
        </>
      )}
    </Page>
  );
}
