import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

const Tags = () => {
  const data = useStaticQuery(graphql`
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

  const tags = [
    ...new Set(
      nodes
        .reduce(
          (acc, node) => acc.concat(node.frontmatter.tags.split(', ')),
          []
        )
        .map(tag => tag.toLowerCase())
        .sort()
    ),
  ];
  return (
    <ul>
      {tags.map(tag => (
        <li>
          <Link to={`/tag/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
