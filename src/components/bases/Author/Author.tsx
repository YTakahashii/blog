import { Avatar, AvatarProps, HStack, VStack, Text, Link } from '@chakra-ui/react';

type Props = AvatarProps & {
  twitterId?: string;
};

export const Author: React.VFC<Props> = ({ name, twitterId, ...rest }) => (
  <HStack>
    <Avatar name={name} {...rest} />
    <VStack align="stretch">
      <Text fontSize="sm" m={0}>
        {name}
      </Text>
      <Link
        href={`https://twitter.com/${twitterId}`}
        isExternal
        m={0}
        fontSize="sm"
        color="linkedin.700"
        style={{ marginTop: '0 !important' }}
      >{`@${twitterId}`}</Link>
    </VStack>
  </HStack>
);
