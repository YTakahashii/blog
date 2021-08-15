import { Heading, VStack, Text, Divider } from '@chakra-ui/react';
import { InternalLink } from 'src/components/bases/InternalLink';
import { Post } from 'src/types/Post';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { DateFormatter } from 'src/utils/DateFormatter';

type Props = {
  post: Post;
};

export const PostListItem: React.VFC<Props> = ({ post }) => (
  <VStack align="stretch" role="listitem" spacing={10} my={10}>
    <Divider />
    <VStack align="stretch" spacing={5}>
      <VStack align="stretch" spacing={1}>
        <Text m={0}>{DateFormatter.splitBySlash(post.publishDate)}</Text>
        <Heading as="h2" fontSize="2xl" color="linkedin.700" m={0}>
          <InternalLink href={`/${post.slug}`}>{post.title}</InternalLink>
        </Heading>
      </VStack>
      <Text m={0}>{post.excerpt}</Text>
    </VStack>
  </VStack>
);
