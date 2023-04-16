import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout, Seo } from '../components';

export default function TagPageTemplate({ data, pageContext }) {
  return (
    <Layout>
      <h1>Posts that are tagged "{pageContext.tag}"</h1>
      <ul>
        {data.allMdx.nodes.map(node => (
          <li>
            <Link to={`/posts${node.frontmatter.slug}`}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const tags = graphql`
  query ($tagRegex: String!) {
    allMdx(filter: { frontmatter: { tags: { regex: $tagRegex } } }) {
      nodes {
        frontmatter {
          slug
          date
          seoTitle
          title
          tags
        }
      }
    }
  }
`;
export const Head = ({ data, pageContext }) => (
  <Seo title={`Posts that are tagged with ${pageContext.tag}`} />
);
