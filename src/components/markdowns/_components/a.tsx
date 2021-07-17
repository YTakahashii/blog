import { ComponentPropsWithoutRef } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = ComponentPropsWithoutRef<'a'>;

export const a: React.FC<Props> = ({ children, href }) =>
  href.startsWith('/') || href === '' ? (
    <NextLink href={href} passHref>
      <Link textDecoration="underline">{children}</Link>
    </NextLink>
  ) : (
    <Link href={href} color="blue.500" textDecoration="underline" isExternal>
      {children}
    </Link>
  );
