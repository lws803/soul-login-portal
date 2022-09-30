import { CheckCircleIcon } from '@chakra-ui/icons';
import { HStack, Tooltip, Text } from '@chakra-ui/react';
import { Platform } from '../api';

export default function Title({ platform }: Props) {
  return (
    <HStack justifyContent="center" w={['90vw', '90vw', '500px', '500px']}>
      <Text
        fontSize="3xl"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        fontWeight="bold"
        flexShrink={1}
      >
        {platform.name}
      </Text>
      {platform.isVerified && (
        <Tooltip label="This platform is verified" flexShrink={0}>
          <span>
            <CheckCircleIcon
              color="soul.green.200"
              aria-label="Verified marker"
            />
          </span>
        </Tooltip>
      )}
    </HStack>
  );
}

type Props = {
  platform: Platform;
};
