import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getAllPosts } from 'src/lib/api';
import { Post } from 'src/types/Post';
import Link from 'next/link';

type StaticProps = {
  posts: Partial<Post>[];
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const posts = getAllPosts(['title', 'publishDate', 'slug']);

  return {
    props: {
      posts,
    },
  };
};

export default PostsPage;
