import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'src/components/layouts/Layout';
import { theme } from 'src/theme';

import '@fontsource/noto-sans-jp/japanese-400.css';
import '@fontsource/noto-sans-jp/japanese-700.css';
import '@fontsource/noto-sans-jp/japanese-900.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default App;
