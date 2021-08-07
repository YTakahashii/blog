import NextLink from 'next/link';
import { SkeletonImage } from 'src/components/bases/SkeletonImage';
import { basePath } from 'src/constants/env';

export const SiteIcon: React.VFC = () => (
  <NextLink href="/">
    <a>
      <SkeletonImage
        src={`${basePath}/logo.svg`}
        alt="y.t.dev"
        aria-label="トップページへ"
        w={{ md: '150px', base: '120px' }}
        h="auto"
        cursor="pointer"
      />
    </a>
  </NextLink>
);
