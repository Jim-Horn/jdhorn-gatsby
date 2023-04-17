import * as React from 'react';
import { ExternalLink, Layout, Seo } from '../components';

const SiteMapPage = () => (
  <Layout>
    <h1>Contact me</h1>

    <p>Some places to try reaching out:</p>
    <ul>
      <li>
        GitHub: <ExternalLink children="https://github.com/Jim-Horn" />
      </li>
      <li>
        LinkedIn:{' '}
        <ExternalLink children="https://www.linkedin.com/in/jdhorn/" />
      </li>
      <li>
        Twitter: <ExternalLink children="https://twitter.com/jdhorn" />
      </li>
    </ul>
  </Layout>
);

export const Head = () => <Seo title="Contact me" />;

export default SiteMapPage;
