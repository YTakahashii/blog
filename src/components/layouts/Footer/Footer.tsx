import { BackToTop } from './BackToTop';
import { Box } from '@chakra-ui/react';

type ChildElements = {
  BackToTop: typeof BackToTop;
};

export const Footer: React.FC & ChildElements = ({ children }) => (
  <Box as="footer" my={6}>
    {children}
  </Box>
);

Footer.BackToTop = BackToTop;
