import { ComponentPropsWithoutRef } from 'react';
import { SkeletonImage } from 'src/components/bases/SkeletonImage';
import { basePath } from 'src/constants/env';

type Props = ComponentPropsWithoutRef<'img'>;

export const img: React.VFC<Props> = ({ src, width, height, alt }) => {
  const relativePublicPath = '../public/' as const;
  const nextSrc = src.startsWith(relativePublicPath) ? src.substring(relativePublicPath.length) : src; // assets から始まるnextが解釈可能なパスに変換

  return <SkeletonImage src={`${basePath}/${nextSrc}`} w={width} h={height} alt={alt} aria-label={alt} m="0 auto" />;
};
