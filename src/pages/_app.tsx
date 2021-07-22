import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'src/components/layouts/Layout';
import { theme } from 'src/theme';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default App;
