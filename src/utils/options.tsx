import React, { ReactNode, FC } from 'react';
import { ExternalLink, Pen } from '../components';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { getTabs } from './getTabs';
import { Link } from 'gatsby';

interface ChildProps {
  children: ReactNode;
}

const Bold: FC<ChildProps> = ({ children }) => (
  <span className="bold">{children}</span>
);

const Text: FC<ChildProps> = ({ children }) => (
  <p className="align-center">{children}</p>
);

interface ContentfulAsset {
  gatsbyImageData: IGatsbyImageData;
  description: string;
  title: string;
}

interface ContentfulCodeBlock {
  code: {
    code: string;
  };
  language: string;
  showLineNumbers: boolean;
}

interface ContentfulCodePen {
  hash: string;
  editable: boolean;
  height: number;
  defaultTab: any;
  showResult: boolean;
}

interface ContentfulPost {
  slug: string;
  title: string;
}

interface ContentfulExternalLink {
  url: string;
  text: string | null;
}

export const options: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if (node.data.target.__typename === 'ContentfulAsset') {
        const { gatsbyImageData, description, title } = node.data
          .target as ContentfulAsset;
        return (
          <GatsbyImage
            image={gatsbyImageData}
            alt={description}
            title={title}
          />
        );
      }
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      if (node.data.target.__typename === 'ContentfulCodeBlock') {
        const { code, language, showLineNumbers } = node.data
          .target as ContentfulCodeBlock;
        return (
          <SyntaxHighlighter
            language={language}
            style={docco}
            showLineNumbers={showLineNumbers}>
            {code.code}
          </SyntaxHighlighter>
        );
      }
      if (node.data.target.__typename === 'ContentfulCodePen') {
        const { hash, editable, height, defaultTab, showResult } = node.data
          .target as ContentfulCodePen;
        return (
          <Pen
            hash={hash}
            editable={editable}
            height={height}
            defaultTab={getTabs(defaultTab, showResult)}
          />
        );
      }
      return (
        <>
          <h2>Embedded Entry</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
      if (node.data.target.__typename === 'ContentfulPost') {
        const { slug, title } = node.data.target as ContentfulPost;
        return (
          <Link to={`/posts${slug}`} title={title}>
            {children}
          </Link>
        );
      }
      return (
        <>
          <pre>{JSON.stringify(node, null, 2)}</pre>
        </>
      );
    },
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      if (node.data.target.__typename === 'ContentfulExternalLink') {
        const { url, text } = node.data.target as ContentfulExternalLink;
        return <ExternalLink href={url}>{text || url}</ExternalLink>;
      }
      return (
        <>
          <h2>Inline Entry</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    },
  },
};
