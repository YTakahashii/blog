import React from 'react';
import { Code } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const code: React.FC<ComponentPropsWithoutRef<'code'>> = ({ children }) =>
  React.Children.count(children) === 1 ? <Code>{children}</Code> : <>{children}</>;
