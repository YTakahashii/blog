import { Heading } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const h3: React.FC<ComponentPropsWithoutRef<'h3'>> = ({ children, ...rest }) => (
  <Heading as="h3" size="xl" {...rest}>
    {children}
  </Heading>
);
