import { Center, Stack, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Center bgColor="#2C2E33">
      <Stack
        direction={['column', 'row']}
        w={[400]}
        margin="16px 0px"
        gap={4}
        padding="8px 16px"
      >
        <Link
          href="https://github.com/soul-project/login-portal"
          target="_blank"
          whiteSpace="nowrap"
        >
          Github
        </Link>
        <Link
          href="https://github.com/soul-project/soul"
          target="_blank"
          whiteSpace="nowrap"
        >
          Soul Network&apos;s Github
        </Link>
        <Link
          href="mailto:lws803@gmail.com"
          target="_blank"
          whiteSpace="nowrap"
        >
          Contact me
        </Link>
      </Stack>
    </Center>
  );
}
