import { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type Props = ComponentPropsWithoutRef<'a'>;

export const InternalOnlyNextLink: React.FC<Props> = ({ children, href }) =>
  href.startsWith('/') || href === '' ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
