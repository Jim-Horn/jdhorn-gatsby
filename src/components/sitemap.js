import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
// import styled from 'styled-components';

const SiteMap = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage {
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
      {data.allSitePage.edges
        .filter(node => !node.node.path.includes('404'))
        .map(node => (
          <li>
            <Link to={node.node.path}>{node.node.path}</Link>
          </li>
        ))}
    </ul>
  );
};

export default SiteMap;
