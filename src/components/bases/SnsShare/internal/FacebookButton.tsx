import { IconButton, Link } from '@chakra-ui/react';
import { FaFacebookF } from 'react-icons/fa';

type Props = {
  url: string;
};

export const FacebookButton: React.VFC<Props> = ({ url }) => (
  <Link href={`https://www.facebook.com/share.php?u=${url}`} isExternal>
    <IconButton
      colorScheme="facebook"
      aria-label="Facebookでシェアする"
      size="sm"
      borderRadius="full"
      icon={<FaFacebookF />}
    />
  </Link>
);
