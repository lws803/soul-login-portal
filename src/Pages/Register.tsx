import { useState } from 'react';
import { Text, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Form from './Register/Form';

import Page from '../components/Page';
import Title from '../components/Title';

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { search } = useLocation();

  return (
    <Page
      errors={errors}
      title={
        <Title
          title="Create new account"
          subTitle={
            <Text>
              Already a member?{' '}
              <Link href={`/${search}`} target="_self" whiteSpace="nowrap">
                <strong>Log in</strong>
              </Link>
            </Text>
          }
        />
      }
    >
      <Form setErrors={setErrors} />
    </Page>
  );
}
