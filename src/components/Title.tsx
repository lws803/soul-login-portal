import { Box, Text } from '@chakra-ui/react';

export default function Title({ title, subTitle }: Props) {
  return (
    <Box marginBottom="32px">
      <Text fontSize="4xl" fontWeight="bold">
        {title}
      </Text>
      <Box mt="8px">{subTitle}</Box>
    </Box>
  );
}

type Props = {
  title: string;
  subTitle?: React.ReactNode;
};
