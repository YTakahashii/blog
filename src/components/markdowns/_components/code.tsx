import React from 'react';
import { Code } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const code: React.FC<ComponentPropsWithoutRef<'code'>> = ({ children }) =>
  React.Children.count(children) === 1 ? (
    <Code fontWeight="bold" bg="white" _before={{ content: '"`"' }} _after={{ content: '"`"' }}>
      {children}
    </Code>
  ) : (
    <>{children}</>
  );
