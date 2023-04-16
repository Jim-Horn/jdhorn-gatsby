import React from 'react';
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

export default function PageTemplate({ data, children }) {
  const { frontmatter } = data.mdx;
  const { date, dateDiff, tags, title } = frontmatter;
  return (
    <Layout>
      <h1>
        {title}
        <br />
        <Date>{date}</Date>
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
        date(formatString: "dddd, MMMM DD, YYYY")
        slug
        title
        seoTitle
        tags
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.seoTitle} />;
