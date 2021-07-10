import { Box } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const pre: React.FC<ComponentPropsWithoutRef<'pre'>> = ({ children, className, style }) => (
  <Box as="pre" p={2} my={5} borderRadius="md" {...{ className, style }}>
    {children}
  </Box>
);
