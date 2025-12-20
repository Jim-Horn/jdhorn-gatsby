import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

const Sitemap = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage(
        filter: { path: { regex: "/^((?!404/).)*$/" } }
        sort: { path: ASC }
      ) {
        edges {
          node {
            path
          }
        }
      }
    }
  `);

  const filteredPages = data.allSitePage.edges;

  return (
    <ul>
      {filteredPages.map((node: { node: { path: string } }) => {
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

export { Sitemap };
