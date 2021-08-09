import { IconButton, IconButtonProps, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

type Props = {
  href: string;
} & IconButtonProps;

export const GitHubButton: React.VFC<Props> = ({ href, ...rest }) => (
  <Link href={href} isExternal>
    <IconButton
      color="white"
      bg="#24292f"
      _hover={{ bg: 'gray.700' }}
      size="sm"
      borderRadius="full"
      icon={<FaGithub />}
      {...rest}
    />
  </Link>
);
