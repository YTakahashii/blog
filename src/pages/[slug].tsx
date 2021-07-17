import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getAllPosts, getPostBySlug } from 'src/lib/api';
import { markdownToHtml } from 'src/lib/markdownToHtml';
import { Post } from 'src/types/Post';
import { Markdown } from 'src/components/markdowns';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <article>
        <Markdown rawHtml={post?.content ?? ''} />
      </article>
    </>
  );
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<{ post: Partial<Post> }, Params> = async ({ params }) => {
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
  const posts = getAllPosts(['slug'], 'all');

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
