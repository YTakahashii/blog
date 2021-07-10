import { Alert, AlertDescription } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const blockquote: React.FC<ComponentPropsWithoutRef<'blockquote'>> = ({ children }) => (
  <Alert
    as="blockquote"
    borderRadius="md"
    display="flex"
    alignItems="center"
    p={4}
    my={5}
    borderInlineStartWidth="4px"
    borderInlineStartColor="blue.400"
    bg="blue.50"
  >
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);
