import * as React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import SiteMap from '../components/Sitemap';

const NotFoundPage = () => (
  <Layout>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <h2>Maybe you're looking for one of these:</h2>
    <SiteMap />
  </Layout>
);

export const Head = () => (
  <Seo title="404: Not Found" description={''} children={undefined} />
);

export default NotFoundPage;
