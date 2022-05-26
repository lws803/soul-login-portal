import { useEffect, useState } from 'react';
import { Text, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Form from './Register/Form';

import Page from '../components/Page';
import Title from '../components/Title';
import useQuery from '../hooks/useQuery';

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { search } = useLocation();
  const query = useQuery();

  const insufficientParams =
    !query.get('platformId') ||
    !query.get('callback') ||
    !query.get('state') ||
    !query.get('codeChallenge');

  useEffect(() => {
    if (insufficientParams) {
      setErrors([
        'Insufficient parameters provided in the url, a callback, platformId, state ' +
          'and codeChallenge must be specified.',
      ]);
    }
  }, [query]);

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
      <Form setErrors={setErrors} disabled={insufficientParams} />
    </Page>
  );
}
