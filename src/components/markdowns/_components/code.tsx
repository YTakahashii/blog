import React from 'react';
import { Code } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export const code: React.FC<ComponentPropsWithoutRef<'code'>> = ({ children, className }) => {
  if (React.Children.count(children) === 1) {
    const isTweet = className === 'language-twitter';
    if (isTweet) {
      const tweetId = children.toString().replace('\n', '');
      return <TwitterTweetEmbed tweetId={tweetId} />;
    }
    return (
      <Code fontWeight="bold" bg="white" _before={{ content: '"`"' }} _after={{ content: '"`"' }}>
        {children}
      </Code>
    );
  }

  return <>{children}</>;
};
