import React, { useState } from 'react';

import Form from './RequestPasswordReset/Form';

import Status from '../components/Status';
import Page from '../components/Page';
import Title from '../components/Title';

export default function RequestPasswordReset() {
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Page errors={errors} title={<Title title="Request new password" />}>
      {isSuccess ? (
        <Status
          status="Request submitted!"
          message={
            'Password reset requested, you will receive an email shortly if your ' +
            'email address exists in our database. Please check your spam inbox if ' +
            "you haven't received an email after a few minutes."
          }
        />
      ) : (
        <Form setErrors={setErrors} setIsSuccess={setIsSuccess} />
      )}
    </Page>
  );
}
