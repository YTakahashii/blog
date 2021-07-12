import { ComponentPropsWithoutRef } from 'react';
import { Image } from '@chakra-ui/react';
import { basePath } from 'src/constants/env';

type Props = ComponentPropsWithoutRef<'img'>;

export const img: React.VFC<Props> = ({ src, width, height, ...rest }) => {
  const relativePublicPath = '../public' as const;
  const nextSrc = src.startsWith(relativePublicPath) ? src.substring(relativePublicPath.length) : src; // /assets から始まるnextが解釈可能なパスに変換

  return <img src={`${basePath}${nextSrc}`} width={700} height={394} />;
};
