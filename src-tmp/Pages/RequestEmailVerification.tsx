import React, { useState } from 'react';

import Form from './RequestEmailVerification/Form';

import Status from '../components/Status';
import Page from '../components/Page';
import Title from '../components/Title';

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
