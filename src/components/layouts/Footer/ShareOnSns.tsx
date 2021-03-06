import { Box, Divider, HStack, Text } from '@chakra-ui/react';
import { LinkedIconButton } from 'src/components/bases/LinkedIconButton';
import { SITE_NAME } from 'src/constants/site';
import { Post } from 'src/types/Post';

type Props = {
  post: Post;
};

export const ShareOnSns: React.VFC<Props> = ({ post }) => {
  const sharingTitle = `${post.title}｜${SITE_NAME}`;
  const sharingUrl = encodeURI(post.url);

  return (
    <Box>
      <HStack py={6}>
        <LinkedIconButton>
          <LinkedIconButton.Twitter
            href={`https://twitter.com/share?url=${sharingUrl}&text=${sharingTitle}`}
            aria-label={`「${post.title}」をTwitterでシェアする`}
            variant="link"
            size="lg"
          />
          <LinkedIconButton.Facebook
            href={`https://www.facebook.com/share.php?u=${sharingUrl}`}
            aria-label={`「${post.title}」をFacebookでシェアする`}
            variant="link"
            size="lg"
          />
        </LinkedIconButton>
      </HStack>
    </Box>
  );
};
