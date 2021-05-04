import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';

export async function markdownToHtml(markdown: string) {
  const result = unified() // unifiedライブラリの処理をまとめる
    .use(remarkParse) // Markdownをmdast(Markdownの抽象構文木)に変換
    .use(remarkRehype) // mdastをhast(HTMLの抽象構文木)に変換
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
        theme: 'github-dark',
      }),
    }) // shikiハイライターでコードブロックをハイライト
    .use(rehypeStringify) // hastをHTMLに変換
    .processSync(markdown); // 上記の処理を行うデータをここで受け取る

  return result.toString();
}
