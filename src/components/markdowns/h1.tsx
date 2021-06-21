import { Heading } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const h1: React.FC<ComponentPropsWithoutRef<'h1'>> = ({ children, ...rest }) => (
  <Heading as="h1" size="3xl" {...rest}>
    {children}
  </Heading>
);
