import { Container } from '@chakra-ui/react';

export const Layout: React.FC = ({ children }) => {
  return <Container maxW={{ base: 'full', md: 'container.md' }}>{children}</Container>;
};
