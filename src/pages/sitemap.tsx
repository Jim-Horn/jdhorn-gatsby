import * as React from 'react';
import { Layout, Seo, OldSiteMap } from '../components';

const SiteMapPage = () => (
  <Layout>
    <h1>All site pages</h1>
    <OldSiteMap />
  </Layout>
);

export const Head = () => (
  <Seo title="Site Map" description={''} children={undefined} />
);

export default SiteMapPage;
