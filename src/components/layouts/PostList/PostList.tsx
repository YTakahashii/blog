import { Divider, List } from '@chakra-ui/react';
import { Post } from 'src/types/Post';
import { PostListItem } from './PostListItem';

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => (
  <List>
    {posts.map((post) => (
      <PostListItem key={post?.slug} post={post} />
    ))}
  </List>
);
