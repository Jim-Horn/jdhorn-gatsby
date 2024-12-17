import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useAuth } from '../components/AuthContext';

const Sitemap = () => {
  const { isAuthenticated } = useAuth();

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

  const filteredPages = data.allSitePage.edges.filter(
    (edge: { node: { path: string } }) => {
      const path = edge.node.path;
      if (!isAuthenticated && path.startsWith('/admin')) return false;
      return true;
    },
  );
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
