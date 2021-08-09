import { Box } from '@chakra-ui/react';
import { BackToTop } from './BackToTop';
import { ShareOnSns } from './ShareOnSns';

type ChildElements = {
  BackToTop: typeof BackToTop;
  ShareOnSns: typeof ShareOnSns;
};

export const Footer: React.FC & ChildElements = ({ children }) => (
  <Box as="footer" my={6}>
    {children}
  </Box>
);

Footer.BackToTop = BackToTop;
Footer.ShareOnSns = ShareOnSns;
