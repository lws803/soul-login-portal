import { useState } from 'react';

import RegisterForm from './register/register-form';

import Page from '../components/page';

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Page errors={errors}>
      <RegisterForm setErrors={setErrors} />
    </Page>
  );
}
