import { Box, Center, Text } from '@chakra-ui/react';

export default function LoggingIn() {
  return (
    <Center>
      <Box p={8} width={500}>
        <Text fontSize="lg" mt={10}>
          Logging you in...
        </Text>
      </Box>
    </Center>
  );
}
