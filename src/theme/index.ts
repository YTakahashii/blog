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
        mt: 12,
        mb: 6,
      },
      h1: {
        fontSize: '4xl',
      },
      h2: {
        fontSize: '3xl',
      },
      h3: {
        fontSize: '2xl',
      },
      h4: {
        fontSize: 'xl',
      },
      h5: {
        fontSize: 'lg',
      },
      h6: {
        fontSize: 'md',
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
