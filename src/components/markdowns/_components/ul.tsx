import { UnorderedList } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const ul: React.FC<ComponentPropsWithoutRef<'ul'>> = ({ children }) => <UnorderedList>{children}</UnorderedList>;
