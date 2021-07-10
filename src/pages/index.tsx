import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getAllPosts } from 'src/lib/api';
import { Post } from 'src/types/Post';
import { PostList } from 'src/components/layouts/PostList';

type StaticProps = {
  posts: Partial<Post>[];
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <PostList posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const posts = getAllPosts(['title', 'publishDate', 'slug', 'excerpt']);

  return {
    props: {
      posts,
    },
  };
};

export default PostsPage;
