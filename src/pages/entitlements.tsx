import * as React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';
import SiteMap from '../components/sitemap';

const Entitlements = () => (
  <Layout>
    <h1>Entitlements page</h1>
    <a href="https://next-app-for-iframe.vercel.app/">the app</a>
  </Layout>
);

export const Head = () => (
  <Seo
    title="embedded entitlements page"
    description={''}
    children={undefined}
  />
);

export default Entitlements;
