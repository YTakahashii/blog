import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getAllPosts } from 'src/lib/api';
import { Post } from 'src/types/Post';
import { PostList } from 'src/components/layouts/PostList';
import { Text, Heading, VStack } from '@chakra-ui/react';

type StaticProps = {
  posts: Partial<Post>[];
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <VStack align="stretch" spacing={3}>
        <Heading as="h1" m={0} fontSize={{ md: '4xl', base: '3xl' }}>
          最新の投稿
        </Heading>
        <Text m={0}>技術に関連する取り組みや学んだことを日記感覚でまとめます。</Text>
      </VStack>
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
