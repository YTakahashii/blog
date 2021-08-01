import { HStack } from '@chakra-ui/react';
import { SiteIcon } from './SiteIcon';

export const Header: React.VFC = () => {
  return (
    <HStack py={{ md: 10, base: 8 }}>
      <SiteIcon />
    </HStack>
  );
};
