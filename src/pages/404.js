import * as React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';
import SiteMap from '../components/sitemap';

const NotFoundPage = data => (
  <Layout>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <h2>Maybe you're looking for one of these:</h2>
    <SiteMap />
  </Layout>
);

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;
