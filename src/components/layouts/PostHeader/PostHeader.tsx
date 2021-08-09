import { Divider, VStack } from '@chakra-ui/react';
import { Post } from 'src/types/Post';
import { DateFormatter } from 'src/utils/DateFormatter';
import { Text, Heading } from '@chakra-ui/react';
import { Author } from 'src/components/bases/Author';
import { SnsShare } from 'src/components/bases/SnsShare';
import { TWITTER_ID } from 'src/constants/site';

type Props = {
  post: Post;
};

export const PostHeader: React.VFC<Props> = ({ post }) => (
  <>
    <VStack spacing={4}>
      <VStack spacing={0}>
        <Text m={0}>{DateFormatter.splitBySlash(post.publishDate)}</Text>
        <Heading as="h1" fontSize={{ lg: '5xl', md: '4xl', base: '3xl' }}>
          {post.title}
        </Heading>
      </VStack>
      <Author name="Yuta Takahashi" twitterId={TWITTER_ID} src="https://bit.ly/wakeupsloth" />
      <SnsShare post={post} />
    </VStack>
    <Divider my={8} />
  </>
);
