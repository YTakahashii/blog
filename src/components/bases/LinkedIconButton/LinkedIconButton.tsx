import { HStack, VStack } from '@chakra-ui/react';
import { FacebookButton } from './internal/FacebookButton';
import { TwitterButton } from './internal/TwitterButton';
import { GitHubButton } from './internal/GitHubButton';

type ChildElements = {
  Twitter: typeof TwitterButton;
  Facebook: typeof FacebookButton;
  GitHub: typeof GitHubButton;
};

type Props = {
  direction?: 'vertical' | 'horizontal';
};

export const LinkedIconButton: React.FC<Props> & ChildElements = ({ direction, children }) =>
  direction === 'horizontal' ? (
    <HStack m={0}>{children}</HStack>
  ) : (
    <VStack align="stretch" m={0}>
      {children}
    </VStack>
  );

LinkedIconButton.defaultProps = {
  direction: 'horizontal',
};

LinkedIconButton.Twitter = TwitterButton;
LinkedIconButton.Facebook = FacebookButton;
LinkedIconButton.GitHub = GitHubButton;
