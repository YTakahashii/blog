import { List } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const ul: React.FC<ComponentPropsWithoutRef<'ul'>> = ({ children, ...rest }) => (
  <List {...rest}>{children}</List>
);
