import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

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
  <CenteredContent>
    <div>
      <h1>Hi</h1>
      <p>You've arrived at jdhorn.com</p>
      <p>Actual content coming soon</p>
      <p>
        Existing stuff <Link to="/sitemap">here</Link>
      </p>
    </div>
  </CenteredContent>
);

export const Head = () => <Seo title="Home" />;

export default HomePage;
