import React, { ReactNode } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Layout, ListTags, Seo } from '../components';
import styled from 'styled-components';

const shortcodes = { Link };

const Date = styled.span`
  font-size: small;
`;

const ContentSection = styled.section`
  margin-bottom: 1rem;
`;

interface PageTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        date: string;
        dateDiff: string;
        tags: string;
        title: string;
      };
    };
  };
  children: ReactNode;
}

export default function PageTemplate({ data, children }: PageTemplateProps) {
  const { frontmatter } = data.mdx;
  const { date, dateDiff, tags, title } = frontmatter;
  return (
    <Layout>
      <h1>
        {title}
        <br />
        <Date title={dateDiff}>{date}</Date>
      </h1>
      <ContentSection>
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </ContentSection>
      {tags && <ListTags tags={tags} />}
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        dateDiff: date(fromNow: true)
        date(formatString: "dddd, MMMM DD, YYYY")
        slug
        title
        seoTitle
        tags
      }
    }
  }
`;

interface HeadProps {
  data: {
    mdx: {
      frontmatter: {
        seoTitle: string;
      };
    };
  };
}

export const Head = ({ data }: HeadProps) => (
  <Seo
    title={data.mdx.frontmatter.seoTitle}
    description={''}
    children={undefined}
  />
);
