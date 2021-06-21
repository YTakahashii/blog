import { Heading } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const h5: React.FC<ComponentPropsWithoutRef<'h5'>> = ({ children, ...rest }) => (
  <Heading as="h5" size="md" {...rest}>
    {children}
  </Heading>
);
