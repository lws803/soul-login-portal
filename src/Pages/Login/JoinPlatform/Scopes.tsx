import React from 'react';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import ScopeRow from './Scopes/ScoprRow';

export default function Scopes() {
  return (
    <Box
      borderRadius="md"
      borderStyle="solid"
      borderColor="soul.mutedGrey"
      borderWidth="1px"
      padding="1rem"
    >
      <VStack alignItems="left">
        <Text>
          Joining this platform will allow the platform and it&apos;s developers
          to:
        </Text>
        <Divider />
        <VStack alignItems="left" overflowY="auto" maxHeight="30vh">
          <ScopeRow title="Access your account information." />
          <ScopeRow title="Modify your account." />
          <ScopeRow title="Access your user connections." />
          <ScopeRow title="Modify your user connections." />
          <ScopeRow title="Access your membership on this platform." />
          <ScopeRow title="Modify your membership on this platform." />
        </VStack>
      </VStack>
    </Box>
  );
}
