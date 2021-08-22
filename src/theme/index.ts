import { extendTheme } from '@chakra-ui/react';

const fontFamily =
  `Inter, 'Noto Sans JP', -apple-system, 'Segoe UI', 'Helvetica Neue', 'Hiragino Kaku Gothic ProN', メイリオ, meiryo, sans-serif` as const;

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
  },
  styles: {
    global: ({ colorMode }) => ({
      '*, ::before, ::after': {
        overflowWrap: 'break-word',
      },
      'html, body': {
        bg: colorMode === 'light' ? 'white' : 'gray.800',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontWeight: 'bold',
        mt: { md: 12, base: 6 },
        mb: { md: 6, base: 3 },
      },
      h1: {
        fontSize: { md: '4xl', base: '3xl' },
      },
      h2: {
        fontSize: { md: '3xl', base: '2xl' },
      },
      h3: {
        fontSize: { md: '2xl', base: 'xl' },
      },
      h4: {
        fontSize: { md: 'xl', base: 'lg' },
      },
      h5: {
        fontSize: { md: 'lg', base: 'md' },
      },
      h6: {
        fontSize: { md: 'md', base: 'sm' },
      },
      p: {
        my: 5,
      },
      'a, p, em, li, td, span': {
        color: 'gray.700',
      },
      strong: {
        color: 'gray.800',
      },
    }),
  },
});
