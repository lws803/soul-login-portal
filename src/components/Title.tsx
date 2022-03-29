import { Box, Text } from '@chakra-ui/react';

export default function Title({ title, subTitle }: Props) {
  return (
    <Box marginBottom="40px">
      <Text fontSize="4xl" fontWeight="bold">
        {title}
      </Text>
      {subTitle}
    </Box>
  );
}

type Props = {
  title: string;
  subTitle?: React.ReactNode;
};
