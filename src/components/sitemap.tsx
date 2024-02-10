import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

const SiteMap = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage(
        filter: { path: { regex: "/^((?!404).)*$/" } }
        sort: { fields: path }
      ) {
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
      {data.allSitePage.edges.map((node: { node: { path: string } }) => {
        let linkText = node.node.path;
        linkText === '/' && (linkText = 'home');
        return (
          <li key={node.node.path}>
            <Link to={node.node.path}>{linkText}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SiteMap;
