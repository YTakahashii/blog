import { Heading } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const h6: React.FC<ComponentPropsWithoutRef<'h6'>> = ({ children, ...rest }) => (
  <Heading as="h6" size="sm" {...rest}>
    {children}
  </Heading>
);
