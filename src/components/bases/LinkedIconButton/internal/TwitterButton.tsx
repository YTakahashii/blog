import { IconButton, IconButtonProps, Link } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';

type Props = {
  href: string;
} & IconButtonProps;

export const TwitterButton: React.VFC<Props> = ({ href, ...rest }) => (
  <Link href={href} display="flex" isExternal>
    <IconButton colorScheme="twitter" size="sm" borderRadius="full" icon={<FaTwitter />} {...rest} />
  </Link>
);
