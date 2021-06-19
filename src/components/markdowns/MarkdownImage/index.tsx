import { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';

type Props = ComponentPropsWithoutRef<'img'>;

export const MarkdownImage: React.VFC<Props> = ({ src, width, height, ...rest }) => {
  const relativePublicPath = '../public' as const;
  const nextSrc = src.startsWith(relativePublicPath) ? src.substring(relativePublicPath.length) : src; // ローカルの md エディタでも画像を表示したいためパスを変換

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <Image src={nextSrc} width={700} height={394} />
    </div>
  );
};
