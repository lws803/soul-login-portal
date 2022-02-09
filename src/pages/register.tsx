import { useState } from 'react';

import Form from './register/form';

import Page from '../components/page';

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Page errors={errors}>
      <Form setErrors={setErrors} />
    </Page>
  );
}
