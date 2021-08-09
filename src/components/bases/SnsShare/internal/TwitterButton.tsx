import { IconButton, Link } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';

type Props = {
  url: string;
  title: string;
};

export const TwitterButton: React.VFC<Props> = ({ url, title }) => (
  <Link href={`https://twitter.com/share?url=${url}&text=${title}`} isExternal>
    <IconButton
      colorScheme="twitter"
      aria-label="Twitterでシェアする"
      size="sm"
      borderRadius="full"
      icon={<FaTwitter />}
    />
  </Link>
);
