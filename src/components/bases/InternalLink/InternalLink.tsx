import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

export const InternalLink: React.FC<LinkProps> = ({ children, href, ...rest }) => (
  <NextLink href={href} aria-label={rest['aria-label']} passHref>
    <Link w="fit-content" outline="none" _hover={{ outline: 'none' }} {...rest}>
      {children}
    </Link>
  </NextLink>
);
