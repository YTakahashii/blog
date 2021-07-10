import { ListItem } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const li: React.FC<ComponentPropsWithoutRef<'li'>> = ({ children }) => <ListItem my={2}>{children}</ListItem>;
