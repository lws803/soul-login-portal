import { useState } from 'react';
import { Center, Image } from '@chakra-ui/react';

import Form from './register/form';

import Page from '../components/page';
import logo from '../images/logo.png';

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Page errors={errors}>
      <Center mt={10} mb={10}>
        <Image src={logo} maxHeight="150px" />
      </Center>
      <Form setErrors={setErrors} />
    </Page>
  );
}
