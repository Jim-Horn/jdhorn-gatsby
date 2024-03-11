import * as React from 'react';
import { Layout, Seo, Sitemap } from '../components';

const SiteMapPage = () => (
  <Layout>
    <h1>All site pages</h1>
    <Sitemap />
  </Layout>
);

export const Head = () => (
  <Seo title="Site Map" description={''} children={undefined} />
);

export default SiteMapPage;
