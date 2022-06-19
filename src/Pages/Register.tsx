import { useState } from 'react';
import { Text, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Status from 'src/components/Status';

import Form from './Register/Form';

import Page from '../components/Page';
import Title from '../components/Title';
import useQuery from '../hooks/useQuery';

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const { search } = useLocation();
  const query = useQuery();

  const insufficientParams =
    !query.get('client_id') ||
    !query.get('redirect_uri') ||
    !query.get('state') ||
    !query.get('code_challenge');

  return (
    <Page
      errors={errors}
      title={
        <Title
          title="Create new account"
          subTitle={
            !insufficientParams && (
              <Text>
                Already a member?{' '}
                <Link href={`/${search}`} target="_self" whiteSpace="nowrap">
                  <strong>Log in</strong>
                </Link>
              </Text>
            )
          }
        />
      }
    >
      {isSuccess ? (
        <Status
          status="Account registered!"
          message={
            'You should be receiving an email shortly with instructions on activating ' +
            'your account.'
          }
        />
      ) : (
        <Form
          setErrors={setErrors}
          insufficientParams={insufficientParams}
          setIsSuccess={setIsSuccess}
        />
      )}
    </Page>
  );
}
