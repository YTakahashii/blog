import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'src/components/layouts/Layout';
import { theme } from 'src/theme';
import Router from 'next/router';

import { GA_TRACKING_ID, pageView } from '../lib/gtag';

if (GA_TRACKING_ID) {
  Router.events.on('routeChangeComplete', (url) => pageView(url));
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider resetCSS theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default App;
