import { Box, Divider } from '@chakra-ui/react';
import { InternalLink } from 'src/components/bases/InternalLink';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { basePath } from 'src/constants/env';

export const BackToTop: React.VFC = () => (
  <Box>
    <Divider />
    <Box py={6}>
      <InternalLink href={`${basePath}/`} color="blue.500">
        <ArrowBackIcon mr="2px" />
        最新の投稿一覧に戻る
      </InternalLink>
    </Box>
  </Box>
);
