import React, { useState } from 'react';

import Status from './status';
import Form from './request-email-verification/form';

import Page from '../components/page';

export default function RequestEmailVerification() {
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Page errors={errors}>
      {isSuccess ? (
        <Status status="Sent email verification, please check your email." />
      ) : (
        <Form setErrors={setErrors} setIsSuccess={setIsSuccess} />
      )}
    </Page>
  );
}