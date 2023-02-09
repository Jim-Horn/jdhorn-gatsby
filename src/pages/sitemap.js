import * as React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import SiteMap from '../components/sitemap';

const SiteMapPage = () => (
  <Layout>
    <h1>All site pages</h1>
    <SiteMap />
  </Layout>
);

export const Head = () => <Seo title="Site Map" />;

export default SiteMapPage;
