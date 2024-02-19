import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Seo, Posts, Layout } from '../components';

const CenteredContent = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  div {
    margin: 1rem;
    padding: 0.5rem;
  }
`;

const HomePage = () => (
  <Layout>
    <h1>Hi</h1>
    <p>You've arrived at jdhorn.com - a work in progress</p>
    <Posts />
    <p>
      If you're looking for other info, check out the{' '}
      <Link to="/sitemap">SiteMap</Link>
    </p>
  </Layout>
);

export const Head = () => (
  <Seo title="Home" description={''} children={undefined} />
);

export default HomePage;
