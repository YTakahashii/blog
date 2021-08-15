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
    .use(rehypeRaw) // hast内の生HTMLをhastに変換
    .use(rehypeShiki, {
      highlighter: await getHighlighter({
        theme: 'github-dark',
      }),
    }) // highlight <code />
    .use(rehypeStringify) // hast -> raw html
    .processSync(markdown);

  return result.toString();
}
