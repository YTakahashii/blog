import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getAllPosts, getPostBySlug } from 'src/lib/api';
import { markdownToHtml } from 'src/lib/markdownToHtml';
import { Post } from 'src/types/Post';
import { replaceComponents } from 'src/lib/replaceComponents';

type StaticProps = {
  post: Partial<Post>;
};

type Params = {
  slug: string;
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <article>{replaceComponents(post.content)}</article>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params }) => {
  const post = getPostBySlug(params.slug, [
    'title',
    'slug',
    'publishDate',
    'content',
    'coverImage',
    'excerpt',
    'ogImage',
  ]);

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
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false, // ISR
  };
};

export default PostPage;
