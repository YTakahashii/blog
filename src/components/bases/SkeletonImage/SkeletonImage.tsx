import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const LOAD_TIMEOUT_MS = 10000;

export const SkeletonImage: React.VFC<ImageProps> = ({ ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, LOAD_TIMEOUT_MS);
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(true);
  };

  return (
    <Skeleton isLoaded={isLoaded}>
      <Image onLoad={handleLoad} onError={handleError} {...rest} />
    </Skeleton>
  );
};
