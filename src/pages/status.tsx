import { Box, Center, Text } from '@chakra-ui/react';

export default function Status({ status }: Props) {
  return (
    <Center>
      <Box p={8} width={500}>
        <Text fontSize="lg" mt={10}>
          {status}
        </Text>
      </Box>
    </Center>
  );
}

type Props = {
  status: string;
};
