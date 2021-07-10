import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import * as components from 'src/components/markdowns/_components';

type Props = {
  rawHtml: string;
};

export const Markdown: React.VFC<Props> = ({ rawHtml }) => (
  <ReactMarkdown rehypePlugins={[rehypeRaw]} children={rawHtml} components={components} />
);
