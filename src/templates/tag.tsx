import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout, Seo } from '../components';

interface TagPageTemplateProps {
  data: {
    allContentfulPost: {
      nodes: Array<{
        slug: string;
        title: string;
        date: string;
        dateDiff: string;
      }>;
    };
  };
  pageContext: {
    tag: { tag: string; friendlyName: string };
    tagRegex: string;
  };
}

export default function TagPageTemplate({
  data,
  pageContext,
}: TagPageTemplateProps) {
  const { nodes } = data.allContentfulPost;
  return (
    <Layout>
      <h1>Posts tagged "{pageContext.tag.friendlyName}"</h1>
      <ul>
        {nodes.map((node, index) => {
          const { slug, title, date, dateDiff } = node;
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
    allContentfulPost(
      filter: { postTags: { elemMatch: { tag: { regex: $tagRegex } } } }
    ) {
      nodes {
        date
        dateDiff: date(fromNow: true)
        title
        slug
        postTags {
          tag
          friendlyName
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
