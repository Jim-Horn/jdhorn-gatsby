import * as React from 'react';
import { ExternalLink, Layout, Seo } from '../components';

const SiteMapPage = () => (
  <Layout>
    <h1>Contact me</h1>

    <p>Some places to try reaching out:</p>
    <ul>
      <li>
        GitHub: <ExternalLink>https://github.com/Jim-Horn</ExternalLink>
      </li>
      <li>
        LinkedIn:{' '}
        <ExternalLink>https://www.linkedin.com/in/jdhorn/</ExternalLink>
      </li>
      <li>
        Twitter: <ExternalLink>https://twitter.com/jdhorn</ExternalLink>
      </li>
    </ul>
  </Layout>
);

export const Head = () => <Seo title="Contact me" description={''} children={undefined} />;

export default SiteMapPage;
