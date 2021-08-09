import { useRouter } from 'next/router';
import { uri } from 'src/constants/env';
import { Post } from 'src/types/Post';
import { SITE_NAME } from 'src/constants/site';
import { MetaData } from './types';

type UseMetaDataArgs = {
  post?: Post;
};

type UseMetaDataFn = (args: UseMetaDataArgs) => MetaData;

const defaultMetaData: Omit<MetaData, 'url'> = {
  title: `最新の投稿｜${SITE_NAME}`,
  description: '技術に関連する取り組みや学んだことを日記感覚でまとめます。',
  image: '',
};

export const useMetaData: UseMetaDataFn = ({ post }) => {
  const { basePath, asPath } = useRouter();

  if (!post) {
    const url = `${uri}${basePath}${asPath}`;

    return {
      ...defaultMetaData,
      url,
    };
  }

  return {
    title: `${post.title}｜${SITE_NAME}`,
    description: post.excerpt,
    image: post.ogImage.url,
    url: post.url,
    noIndex: post.isPrivate,
  };
};
