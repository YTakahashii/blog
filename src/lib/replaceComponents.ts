import React from 'react';
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { InternalOnlyNextLink } from 'src/components/markdowns/InternalOnlyNextLink';
import { MarkdownImage } from 'src/components/markdowns/MarkdownImage';

export function replaceComponents(html: string) {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        a: InternalOnlyNextLink,
        img: MarkdownImage,
      },
    })
    .processSync(html).result;
}
