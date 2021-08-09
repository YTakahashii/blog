import { Avatar, HStack, Text } from '@chakra-ui/react';
import { LinkedIconButton } from '../LinkedIconButton';

export const Author: React.VFC = () => (
  <HStack>
    <Avatar name="Yuta Takahashi" src="https://bit.ly/wakeupsloth" size="sm" />
    <Text fontSize="sm" m={0}>
      Yuta Takahashi
    </Text>
    <LinkedIconButton>
      <LinkedIconButton.Twitter
        href="https://twitter.com/Wakeupsloth"
        aria-label="Yuta Takahashi の Twitter アカウント"
      />
      <LinkedIconButton.Facebook
        href="https://www.facebook.com/yuta.takahashi.me"
        aria-label="Yuta Takahashi の Facebook アカウント"
      />
      <LinkedIconButton.GitHub href="https://github.com/YTakahashii" aria-label="Yuta Takahashi の GitHub アカウント" />
    </LinkedIconButton>
  </HStack>
);
