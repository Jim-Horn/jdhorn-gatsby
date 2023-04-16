import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout, Seo } from '../components';

export default function TagPageTemplate({ data, pageContext }) {
  const { tag } = pageContext;
  const { nodes } = data.allMdx;
  return (
    <Layout>
      <h1>Posts tagged "{tag}"</h1>
      <ul>
        {nodes.map(node => {
          const { slug, title, date, dateDiff } = node.frontmatter;
          return (
            <li>
              <Link to={`/posts${slug}`} title={`${date} (${dateDiff})`}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/tags">All tags</Link>
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
          dateDiff: date(fromNow: true)
          seoTitle
          title
          tags
        }
      }
    }
  }
`;
export const Head = ({ pageContext }) => (
  <Seo title={`Posts tagged with ${pageContext.tag}`} />
);
