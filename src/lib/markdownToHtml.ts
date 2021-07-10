import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkGitHub from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import rehypeRaw from 'rehype-raw';
import { getHighlighter } from 'shiki';

export async function markdownToHtml(markdown: string) {
  const result = unified()
    .use(remarkParse) // md -> mdast
    .use(remarkGitHub) // GitHub md
    .use(remarkRehype, { allowDangerousHtml: true }) // mdast -> hast
    .use(rehypeRaw)
    .use(rehypeShiki, {
      highlighter: await getHighlighter({
        theme: 'material-theme-ocean',
      }),
    }) // highlight <code />
    .use(rehypeStringify) // hast -> html
    .processSync(markdown);

  return result.toString();
}
