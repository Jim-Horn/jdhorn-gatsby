import * as React from 'react';
import { Layout, Seo, Sitemap } from '../components';

const SitemapPage = () => (
  <Layout>
    <h1>All site pages</h1>
    <Sitemap />
  </Layout>
);

export const Head = () => (
  <Seo title="Site Map" description={''} children={undefined} />
);

export default SitemapPage;
