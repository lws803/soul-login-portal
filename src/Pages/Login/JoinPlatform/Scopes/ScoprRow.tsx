import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/react';

export default function ScopeRow({ title, isNotChecked }: Props) {
  return (
    <HStack>
      {isNotChecked ? (
        <NotAllowedIcon aria-label="Scope not checked" />
      ) : (
        <CheckCircleIcon color="soul.green.200" aria-label="Scope checked" />
      )}
      <Text color="soul.mutedGrey">{title}</Text>
    </HStack>
  );
}

type Props = {
  title: string;
  isNotChecked?: boolean;
};
