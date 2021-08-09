import { HStack } from '@chakra-ui/react';
import { SITE_NAME } from 'src/constants/site';
import { Post } from 'src/types/Post';
import { FacebookButton } from './internal/FacebookButton';
import { TwitterButton } from './internal/TwitterButton';

type Props = {
  post: Post;
};

export const SnsShare: React.VFC<Props> = ({ post }) => (
  <HStack>
    <TwitterButton url={encodeURI(post.url)} title={`${post.title}｜${SITE_NAME}`} />
    <FacebookButton url={encodeURI(post.url)} />
  </HStack>
);
