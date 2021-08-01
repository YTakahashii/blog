import { Image, ImageProps } from '@chakra-ui/react';
import { basePath } from 'src/constants/env';

export const img: React.VFC<ImageProps> = ({ src, width, height, ...rest }) => {
  const relativePublicPath = '../public/' as const;
  const nextSrc = src.startsWith(relativePublicPath) ? src.substring(relativePublicPath.length) : src; // assets から始まるnextが解釈可能なパスに変換

  return <Image src={`${basePath}/${nextSrc}`} m="0 auto" {...rest} />;
};
