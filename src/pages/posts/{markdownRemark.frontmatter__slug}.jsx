import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, ListTags, Seo } from '../../components';
const Date = styled.span`
  font-size: small;
`;

export default function PostTemplate({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { date, tags, title } = frontmatter;
  return (
    <Layout>
      <div>
        <h1>
          {title}
          <br />
          <Date>{date}</Date>
        </h1>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        {tags && <ListTags tags={tags} />}
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
        tags
      }
    }
  }
`;

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.seoTitle} />
);
