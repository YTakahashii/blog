import { Container } from '@chakra-ui/react';

export const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW={{ lg: 'container.md', base: 'full' }} py={8}>
      <main>{children}</main>
    </Container>
  );
};
