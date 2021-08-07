import Head from 'next/head';
import { Post } from 'src/types/Post';
import { useMetaData } from './useMetaData';
import { SITE_NAME, TWITTER_ID } from './constants';

type Props = {
  post?: Partial<Post>;
};

export const MetaData: React.VFC<Props> = ({ post }) => {
  const { title, description, url, image } = useMetaData({ post });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content={TWITTER_ID} />
      <meta name="twitter:creator" content={TWITTER_ID} />

      <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0" />
    </Head>
  );
};
