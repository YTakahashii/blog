import { useRouter } from 'next/router';
import { uri } from 'src/constants/env';
import { Post } from 'src/types/Post';
import { SITE_NAME } from './constants';
import { MetaData } from './types';

type UseMetaDataArgs = {
  post?: Partial<Post>;
};

type UseMetaDataFn = (args: UseMetaDataArgs) => MetaData;

const defaultMetaData: Omit<MetaData, 'url'> = {
  title: `最新の記事一覧｜${SITE_NAME}`,
  description: '技術に関連する取り組みや学んだことを日記感覚でまとめます。',
  image: '',
};

export const useMetaData: UseMetaDataFn = ({ post }) => {
  const router = useRouter();
  const url = `${uri}${router.basePath}${router.asPath}`;

  if (!post) {
    return {
      ...defaultMetaData,
      url,
    };
  }

  return {
    title: `${post.title}｜${SITE_NAME}`,
    description: post.excerpt,
    image: post.ogImage.url,
    url,
  };
};
