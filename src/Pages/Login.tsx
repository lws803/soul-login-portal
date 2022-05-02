import { useState, useEffect } from 'react';
import { Text, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Form from './Login/Form';

import Title from '../components/Title';
import Page from '../components/Page';
import useQuery from '../hooks/useQuery';

export default function Login() {
  const query = useQuery();
  const [errors, setErrors] = useState<string[]>([]);
  const { search } = useLocation();

  const insufficientParams =
    !query.get('platformId') || !query.get('callback') || !query.get('state');

  useEffect(() => {
    if (insufficientParams) {
      setErrors([
        'Insufficient parameters provided in the url, a callback, platformId and state must be specified.',
      ]);
    }
  }, [query]);

  return (
    <Page
      errors={errors}
      title={
        <Title
          title="Login to your account"
          subTitle={
            <Text>
              Not a member yet?{' '}
              <Link href={`/register/${search}`}>
                <strong>Register now</strong>
              </Link>
            </Text>
          }
        />
      }
    >
      <Form
        setErrors={setErrors}
        callback={query.get('callback')!}
        platformId={parseInt(query.get('platformId')!, 10)}
        disabled={insufficientParams}
        state={query.get('state')!}
      />
    </Page>
  );
}
