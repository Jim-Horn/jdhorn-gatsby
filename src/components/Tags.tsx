import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

interface TagQueryData {
  allMdx: {
    nodes: Array<{
      frontmatter: {
        tags: string;
      };
    }>;
  };
}

const Tags: React.FC = () => {
  const data = useStaticQuery<TagQueryData>(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  const { nodes } = data.allMdx;

  const tags: string[] = [
    ...new Set(
      nodes
        .reduce(
          (acc: string[], node) =>
            acc.concat(node.frontmatter.tags.split(', ')),
          [],
        )
        .map((tag: string) => tag.toLowerCase())
        .sort(),
    ),
  ];

  return (
    <ul>
      {tags.map((tag, index) => (
        <li key={index}>
          <Link to={`/tag/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
