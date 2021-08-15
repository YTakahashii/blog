---
title: 'Next.jsで技術ブログを作った話'
excerpt: 'Next.jsを使って技術ブログを作りました。使用した技術スタックと実装や学びについて共有します。'
coverImage: ''
publishDate: '2021-08-15'
ogImage:
  url: 'https://og-image-for-blog.vercel.app/**Next.jsで技術ブログを作った話**.png?theme=light&md=1&fontSize=100px'
---

**世はまさに、自作技術ブログ時代！** という訳で、Next.js 等を使って技術ブログを作りました。

一旦、きりの良いところまで実装が終わったので、公開しようと思います！

このブログでは、趣味で触った技術のことについて、ざっくばらんに記事を投稿していく予定です。
また、私は Web Frontend が好きなので、関連技術の実験場にも活用していきます。

ゴールデンウィークから作り始めて、休日にちまちまやっていたので、随分時間がかかってしまいましたが、いい感じに仕上がってとりあえず満足しています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ゴールデンウィークなので、ブログを作りはじめた <a href="https://t.co/wpIXkEehwl">pic.twitter.com/wpIXkEehwl</a></p>&mdash; yuchan (@Wakeupsloth) <a href="https://twitter.com/Wakeupsloth/status/1389551048017080322?ref_src=twsrc%5Etfw">May 4, 2021</a></blockquote>

以降のセクションでは、技術スタックと、実装に一番の時間を要した Markdown ファイルから React コンポーネントに変換するまでの処理の詳細について振り返ります。

### 技術スタック

本ブログの開発に使用した技術は以下の通りです。（みんな使ってそうな構成）

- [Next.js](https://nextjs.org/)：言わずと知れた React のフレームワーク
- [Chakra UI](https://chakra-ui.com/)：tailwind like に React コンポーネントのスタイリングができるコンポーネントライブラリ
- [jonschlinkert/gray-matter](https://github.com/jonschlinkert/gray-matter)：Markdown に yaml でメタ情報を埋め込めるやつ
- [unifiedjs/unified](https://github.com/unifiedjs/unified)：構文木を使用してテキストを処理するためのインターフェース
- [shiki](https://shiki.matsu.io/)：コードハイライター
- [vercel/og-image](https://github.com/vercel/og-image)：OGP 画像の生成
- [GitHub Pages](https://pages.github.com/)：サイトのホスティング

## やったこと＆学び

最初のゴールとして、Markdown から記事を生成可能かつ、それを見てもらうための最低限の機能に絞って開発を進めました。
やったことを大別すると以下の 3 つになるのかなと思います。

- Markdown ファイルからの記事ページ生成とレイアウト設定
  - MD を変換する処理を実装することで、構文木の世界を学べた
- プライベート記事機能
  - [ブログのトップページ](/)や Google 検索の結果に載せないプライベート記事（例：[Playground](/_playground)）を公開する機能
- メタタグの設定
  - これまで業務的な Web アプリばかりを開発してきたため、学びが多かった

## Markdown ファイルの内容を React コンポーネントに変換する

### 1．Next.js で全 Markdown ファイルを取得して記事ページを生成する

記事ページの生成は Next.js の SSG を使います。

具体的には、[pages/[slug].tsx](https://github.com/YTakahashii/blog/blob/573224fa61a263d26c861aaea6696ad22f0a5469/src/pages/%5Bslug%5D.tsx#L1)内で、 `getStaticPaths` を使って Markdown のファイル名から記事ページの URL を生成し、

```tsx
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = getAllPosts('all');

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
```

`getStaticProps` を使って render する 記事の情報を取得し、Page コンポーネントの Props として渡します。

```tsx
export const getStaticProps: GetStaticProps<{ post: Post }, Params> = async ({ params }) => {
  const post = getPostBySlug(params.slug);

  const html = await markdownToHtml(post.content ?? '');

  return {
    props: {
      post: {
        ...post,
        content: html,
      },
    },
  };
};
```

### 2．unified で Markdown を整形して HTML の文字列に変換する

上記の `getPostBySlug()` では、Markdown ファイルの中身（`post.content`）を文字列で取得します。

続く`markdownToHtml()`では、`unified` を使って、ファイルの中身を HTML の文字列に変換していきます。

```ts
export async function markdownToHtml(markdown: string) {
  const result = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeShiki, {
      highlighter: await getHighlighter({
        theme: 'github-dark',
      }),
    })
    .use(rehypeStringify)
    .processSync(markdown);

  return result.toString();
}
```

変換処理の概要は以下の通りです。

- `remarkParse`：Markdown の文字列を[mdast](https://github.com/syntax-tree/mdast)（Markdown Abstract Syntax Tree format）に変換する
- `remarkRehype`：mdast を [hast](https://github.com/syntax-tree/hast)（Hypertext Abstract Syntax Tree format）に変換する，`{ allowDangerousHtml: true }` により、生の HTML はそのまま残す
- `rehypeRaw`：hast 内の生 HTML を hast に変換する
- `rehypeShiki`：コードハイライターの shiki を使って 複数行のコードブロック をハイライトするスタイルを適用する
- `rehypeStringify`：hast を HTML の文字列に変換する

### 3．HTML の文字列を React コンポーネントに変換する

最後に `markdownToHtml()` で取得した HTML 文字列を [remarkjs/react-markdown](https://github.com/remarkjs/react-markdown)を使って React コンポーネントに変換します。（[components/markdowns/Markdown.tsx](https://github.com/YTakahashii/blog/blob/main/src/components/markdowns/Markdown.tsx)）

```tsx
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import * as components from 'src/components/markdowns/_components';

...

export const Markdown: React.VFC<Props> = ({ rawHtml }) => (
  <ReactMarkdown rehypePlugins={[rehypeRaw]} children={rawHtml} components={components} />
);
```

このとき、`components` に React コンポーネントを渡すことで、任意のタグを自由に変換することができます。今回は、変換するコンポーネントを[components/markdowns/\_components](https://github.com/YTakahashii/blog/tree/main/src/components/markdowns/_components)の中に定義しました。

変換する対象は、[`<table />`](https://github.com/YTakahashii/blog/blob/573224fa61a263d26c861aaea6696ad22f0a5469/src/components/markdowns/_components/table.tsx#L1)のように、Chakra UI のコンポーネントに置き換えるタグと、[`<a />`](https://github.com/YTakahashii/blog/blob/573224fa61a263d26c861aaea6696ad22f0a5469/src/components/markdowns/_components/a.tsx#L1)のように、Props に応じて、レンダリングするコンポーネントを出し分けるタグです。

スタイルだけ当てたいタグについてはここでは変換せず、 [Chakra UI のテーマを設定](https://github.com/YTakahashii/blog/blob/main/src/theme/index.ts)しました。

また、今回は変換対象の文字列（`children`）が HTML の形式であるため、`rehypePlugins` に `rehypeRaw` を指定して、hast に変換する処理を加える必要がありました。ピュアな MD 形式の文字列である場合は、`rehypeRaw` は不要です。

## 今後実装したい機能

- タグ機能
  - 記事が増えていくにつれて探すのが大変になりそうなので、そのうち実装したいお気持ち
- 目次機能
  - この記事みて思ったけど、やっぱり目次あったほうが見やすいですね
- ダークモードや PWA
  - 新しい Web の機能をどんどん使っていきたいお気持ち
- カッコいい OGP 画像の作成
  - 今のデザインが超適当なので、どこかで気合を入れて作り込みたい

## おわりに

これからは、ブログをもっと良くしたり、学んだ内容を定期的にアウトプットしていきたいと思います！

最初は、「ブログなんて今更自分で作ってもな〜」とか思ってたのですが、車輪の再発明をすることで学べることも多いなと感じました。
