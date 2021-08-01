import { Image } from '@chakra-ui/react';
import NextLink from 'next/link';
import { basePath } from 'src/constants/env';

export const SiteIcon: React.VFC = () => (
  <NextLink href="/">
    <a>
      <Image src={`${basePath}/logo.svg`} w="150px" h="auto" cursor="pointer" />
    </a>
  </NextLink>
);
