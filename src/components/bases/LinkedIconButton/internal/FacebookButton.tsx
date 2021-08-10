import { IconButton, IconButtonProps, Link } from '@chakra-ui/react';
import { FaFacebookF } from 'react-icons/fa';

type Props = {
  href: string;
} & IconButtonProps;

export const FacebookButton: React.VFC<Props> = ({ href, ...rest }) => (
  <Link href={href} display="flex" isExternal>
    <IconButton colorScheme="facebook" size="sm" borderRadius="full" icon={<FaFacebookF />} {...rest} />
  </Link>
);
