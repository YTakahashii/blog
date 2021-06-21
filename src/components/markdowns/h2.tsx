import { Heading } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const h2: React.FC<ComponentPropsWithoutRef<'h2'>> = ({ children, ...rest }) => (
  <Heading as="h2" size="2xl" {...rest}>
    {children}
  </Heading>
);
