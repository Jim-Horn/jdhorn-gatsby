import * as React from 'react';
import styled from 'styled-components';

import { Seo, Posts } from '../components/';

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
      <p>You've arrived at jdhorn.com - a work in progress</p>
      <Posts />
    </div>
  </CenteredContent>
);

export const Head = () => <Seo title="Home" />;

export default HomePage;
