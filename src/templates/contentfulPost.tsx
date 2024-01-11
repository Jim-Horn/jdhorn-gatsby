import React, { ReactNode, FC } from 'react';
import { graphql } from 'gatsby';
import { ExternalLink, Pen } from '../components';
import { Layout, ListTags, Seo } from '../components';
import styled from 'styled-components';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { GatsbyImage } from 'gatsby-plugin-image';

interface ChildProps {
  children: ReactNode;
}

const Bold: FC<ChildProps> = ({ children }) => (
  <span className="bold">{children}</span>
);
const Text: FC<ChildProps> = ({ children }) => (
  <p className="align-center">{children}</p>
);

enum Tabs {
  HTML = 'html',
  CSS = 'css',
  JS = 'js',
  None = '',
}

const getTabs = (defaultTab: keyof typeof Tabs, showResult: boolean) => {
  const result = [];
  if (defaultTab !== 'None') {
    result.push(Tabs[defaultTab]);
  }
  if (showResult) {
    result.push('result');
  }
  return result.join(',');
};

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if (node.data.target.__typename === 'ContentfulAsset') {
        const { gatsbyImageData, description, title } = node.data.target;
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
        const { code, language, showLineNumbers } = node.data.target;
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
        const { hash, editable, height, defaultTab, showResult } =
          node.data.target;
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
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      if (node.data.target.__typename === 'ContentfulExternalLink') {
        const { url, text } = node.data.target;
        return <ExternalLink text={text || url}>{url}</ExternalLink>;
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

const Date = styled.span`
  font-size: small;
`;

const ContentSection = styled.section`
  margin-bottom: 1rem;
`;

interface ContentfulPageTemplateProps {
  data: {
    contentfulPost: {
      content: { raw: string };
      date: string;
      dateDiff: string;
      seoTitle: string;
      slug: string;
      tags?: string;
      title: string;
    };
  };
  children: ReactNode;
}

export default function ContentfulPageTemplate({
  data,
}: ContentfulPageTemplateProps) {
  const { content, date, dateDiff, title, tags } = data.contentfulPost;

  return (
    <Layout>
      <h1>
        {title}
        <Date title={dateDiff}>
          <br />
          {date}
        </Date>
      </h1>
      <ContentSection>{renderRichText(content, options)}</ContentSection>
      {tags && <ListTags tags={tags} />}
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      dateDiff: date(fromNow: true)
      date(formatString: "dddd, MMMM DD, YYYY")
      seoTitle
      tags
      content {
        raw
        references {
          ... on ContentfulCodePen {
            contentful_id
            __typename
            hash
            editable
            height
            defaultTab
            showResult
          }
          ... on ContentfulExternalLink {
            __typename
            contentful_id
            url
            text
          }
          ... on ContentfulAsset {
            __typename
            contentful_id
            # gatsbyImageData(layout: CONSTRAINED)
            gatsbyImageData
            description
            title
          }
          ... on ContentfulCodeBlock {
            __typename
            contentful_id
            language
            showLineNumbers
            code {
              code
            }
          }
        }
      }
    }
  }
`;

interface HeadProps {
  data: {
    contentfulPost: {
      seoTitle: string;
    };
  };
}

export const Head = ({ data }: HeadProps) => (
  <Seo title={data.contentfulPost.seoTitle} description={''} children={null} />
);
