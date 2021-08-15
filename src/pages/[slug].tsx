import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getAllPosts, getPostBySlug } from 'src/lib/api';
import { markdownToHtml } from 'src/lib/markdownToHtml';
import { Post } from 'src/types/Post';
import { Markdown } from 'src/components/markdowns';
import { PostHeader } from 'src/components/layouts/PostHeader';
import { Box } from '@chakra-ui/react';
import { Footer } from 'src/components/layouts/Footer';
import { MetaData } from 'src/components/bases/MetaData';
import Script from 'next/script';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <MetaData post={post} />
      <Script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
      <Box as="article">
        <PostHeader post={post} />
        <Markdown rawHtml={post.content ?? ''} />
        <Footer>
          <Footer.ShareOnSns post={post} />
          <Footer.BackToTop />
        </Footer>
      </Box>
    </>
  );
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<{ post: Post }, Params> = async ({ params }) => {
  const post = getPostBySlug(params.slug);

  const html = await markdownToHtml(post.content ?? '');

  return {
    props: {
      post: {
        ...post,
        content: html,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = getAllPosts('all');

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false, // ISR はしない
  };
};

export default PostPage;
