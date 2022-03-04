import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

export default function Status({ status }: Props) {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      minHeight="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Request submitted!
      </AlertTitle>
      <AlertDescription maxWidth="sm">{status}</AlertDescription>
    </Alert>
  );
}

type Props = {
  status: string;
};
