import { Text } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const p: React.FC<ComponentPropsWithoutRef<'p'>> = ({ children }) => <Text my={5}>{children}</Text>;
