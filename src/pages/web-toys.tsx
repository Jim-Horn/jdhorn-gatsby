import * as React from 'react';
import { Layout, Seo } from '../components';
import { Link } from 'gatsby';

const WebToysPage = () => (
  <Layout>
    <h1>Web Toys</h1>

    <p>Various toys and utilities I created:</p>
    <ul>
      <li>
        <Link to="/web-toys/pass-words">Pass🔒Words</Link>: Generate passwords
        that are secure, yet easy to remember using three-letter words.
      </li>
    </ul>
  </Layout>
);

export const Head = () => (
  <Seo
    title="Web Toys"
    description="Various utilities I created"
    children={undefined}
  />
);

export default WebToysPage;
