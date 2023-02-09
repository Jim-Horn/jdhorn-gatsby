import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import styled from 'styled-components';
import Seo from '../../components/seo';

const Tiny = styled.span`
  font-size: small;
`;

export default function ArticleTemplate({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <div>
        <h1>
          {frontmatter.title}
          <br />
          <Tiny>{frontmatter.date}</Tiny>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "dddd, MMMM DD, YYYY")
        slug
        title
        seoTitle
      }
    }
  }
`;

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.seoTitle} />
);
