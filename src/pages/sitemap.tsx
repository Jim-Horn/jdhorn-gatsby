import * as React from 'react';
import { Layout, Seo, SiteMap } from '../components';

const SiteMapPage = () => (
  <Layout>
    <h1>All site pages</h1>
    <SiteMap />
  </Layout>
);

export const Head = () => <Seo title="Site Map" description={''} children={undefined} />;

export default SiteMapPage;
