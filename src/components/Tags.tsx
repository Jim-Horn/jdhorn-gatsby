import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

interface TagQueryData {
  allContentfulPostTags: {
    nodes: Array<{
      tag: string;
      friendlyName: string;
    }>;
  };
}

const Tags: React.FC = () => {
  const data = useStaticQuery<TagQueryData>(graphql`
    query {
      allContentfulPostTags(sort: { friendlyName: ASC }) {
        nodes {
          tag
          friendlyName
        }
      }
    }
  `);

  const { nodes } = data.allContentfulPostTags;

  return (
    <ul>
      {nodes.map((node, index) => {
        const { tag, friendlyName } = node;
        return (
          <li key={index}>
            <Link to={`/tag/${tag}`}>{friendlyName}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
