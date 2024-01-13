import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

const SiteMap = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage(filter: { path: { regex: "/^((?!404).)*$/" } }) {
        edges {
          node {
            path
          }
        }
      }
    }
  `);
  return (
    <ul>
      {data.allSitePage.edges.map((node: { node: { path: string } }) => (
        <li key={node.node.path}>
          <Link to={node.node.path}>{node.node.path}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SiteMap;
