import { Heading } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const h4: React.FC<ComponentPropsWithoutRef<'h4'>> = ({ children, ...rest }) => (
  <Heading as="h4" size="lg" {...rest}>
    {children}
  </Heading>
);
