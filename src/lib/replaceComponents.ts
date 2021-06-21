import React from 'react';
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { h1, h2, h3, h4, h5, h6, a, img, ul, li, code } from 'src/components/markdowns';

export function replaceComponents(html: string): React.ReactElement {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        a,
        img,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        ul,
        li,
        code,
      },
    })
    .processSync(html).result as React.ReactElement;
}
