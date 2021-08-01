import { Container } from '@chakra-ui/react';
import { Header } from '../Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW={{ lg: 'container.md', base: 'full' }}>
      <Header />
      <main>{children}</main>
    </Container>
  );
};
