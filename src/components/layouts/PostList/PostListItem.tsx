import { Heading, VStack, Text } from '@chakra-ui/react';
import { InternalLink } from 'src/components/bases/InternalLink';
import { Post } from 'src/types/Post';
import { ArrowForwardIcon } from '@chakra-ui/icons';

type Props = {
  post: Partial<Post>;
};

export const PostListItem: React.VFC<Props> = ({ post }) => (
  <VStack align="stretch" spacing={5} my={4}>
    <InternalLink href={post?.slug ?? ''}>
      <Heading as="h2" fontSize="2xl" m={0}>
        {post.title}
      </Heading>
    </InternalLink>
    <Text m={0}>{post?.excerpt}</Text>
    <InternalLink href={post?.slug ?? ''}>
      <Text color="teal.500" m={0}>
        続きを読む
        <ArrowForwardIcon />
      </Text>
    </InternalLink>
  </VStack>
);
