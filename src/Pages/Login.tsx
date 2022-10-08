import { useState, useEffect } from 'react';
import { Text, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Form from './Login/Form';

import Title from '../components/Title';
import Page from '../components/Page';
import useQueryParams from '../hooks/useQueryParams';

export default function Login() {
  const query = useQueryParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [joinPlatform, setJoinPlatform] = useState(false);
  const { search } = useLocation();

  const insufficientParams =
    !query.get('client_id') ||
    !query.get('redirect_uri') ||
    !query.get('state') ||
    !query.get('code_challenge');

  useEffect(() => {
    if (insufficientParams) {
      setErrors([
        'Insufficient parameters provided in the url, a redirect_uri, client_id, state ' +
          'and code_challenge must be specified.',
      ]);
    }
  }, [query]);

  return (
    <Page
      errors={errors}
      title={
        !joinPlatform && (
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
        )
      }
    >
      <Form
        setErrors={setErrors}
        callback={query.get('redirect_uri')!}
        platformId={parseInt(query.get('client_id')!, 10)}
        disabled={insufficientParams}
        state={query.get('state')!}
        codeChallenge={query.get('code_challenge')!}
        setJoinPlatform={setJoinPlatform}
        joinPlatform={joinPlatform}
      />
    </Page>
  );
}
