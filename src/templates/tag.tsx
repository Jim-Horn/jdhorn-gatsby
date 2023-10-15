import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout, Seo } from '../components';

interface TagPageTemplateProps {
  data: {
    allMdx: {
      nodes: Array<{
        frontmatter: {
          slug: string;
          title: string;
          date: string;
          dateDiff: string;
        };
      }>;
    };
  };
  pageContext: {
    tag: string;
  };
}

export default function TagPageTemplate({
  data,
  pageContext,
}: TagPageTemplateProps) {
  const { tag } = pageContext;
  const { nodes } = data.allMdx;
  return (
    <Layout>
      <h1>Posts tagged "{tag}"</h1>
      <ul>
        {nodes.map((node, index) => {
          const { slug, title, date, dateDiff } = node.frontmatter;
          return (
            <li key={index}>
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

interface HeadProps {
  pageContext: {
    tag: string;
  };
}

export const Head = ({ pageContext }: HeadProps) => (
  <Seo title={`Posts tagged with ${pageContext.tag}`} description={''} />
);
