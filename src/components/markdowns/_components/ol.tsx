import { OrderedList } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const ol: React.FC<ComponentPropsWithoutRef<'ul'>> = ({ children }) => <OrderedList>{children}</OrderedList>;
