import { ListItem } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const li: React.FC<ComponentPropsWithoutRef<'li'>> = ({ children, ...rest }) => (
  <ListItem {...rest}>{children}</ListItem>
);
